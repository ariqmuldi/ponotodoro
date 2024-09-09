import express from "express";
import cors from "cors";
import env from 'dotenv';
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import session from "express-session";

const app = express();
env.config({ path: '../client/.env' });

const corsOptions = { origin : [process.env.VITE_ADDRESS], credentials: true} // Port Vite servers run on
app.use(cors(corsOptions))
const port = 8080;

app.use(express.json());

const saltRounds = 10;

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
);

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
db.connect();

app.get("/api", (req, res) => {
    res.json( {"fruits" : ["apple", "orange", "banana"]} );
});

app.use("/", (req, res) => {
    res.send("Server is running.");
});

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Username: back ", username);
    console.log("Email: back ", email);
    console.log("Password: back", password);
    
    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [ email, ]);

        if (checkResult.rows.length > 0) { return res.json({ message: 'User already exists, please log in.', user : null, success: false }); }
        else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    res.json({ message: 'Error hashing password.', user : null, success : false});
                } else {
                    const result = await db.query(
                    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
                    [username, email, hash]
                    );
                    res.status(201).json({ message: "User registered successfully and logged in!", 
                    user : { id : result.rows[0].id, username : result.rows[0].username, email : result.rows[0].email }, success : true });
                }
              });
        }

    } catch(err) {
        console.error('Error inserting user: back ', err);
        res.json({ message: 'Registration failed.', user : null, success: false });
    }
    
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const storedHashedPassword = user.password;

            bcrypt.compare(password, storedHashedPassword, (err, valid) => {
                if (err) {
                    return res.json({ message: 'Error comparing passwords: ' + err, user : null, success: false });
                } else {
                    if (valid) {
                        return res.status(201).json({ message: 'Successfully logged in!', user : {id : result.rows[0].id, 
                            username : result.rows[0].username, email : result.rows[0].email }, success: true });
                    } else {
                        return res.json({ message: 'Incorrect email or password.', user : null, success: false });
                    }
                }
            });

        } else {
            return res.json({ message: 'User not found. Please register.', user : null, success: false });
        }

    } catch(err) {
        console.log(err);
    }
});

app.post("/logout", async (req, res) => {
    return res.json({ message: 'Logged out successfully.', user : null, success: true })
});

app.post("/create-note", async (req, res) => { 
    const { title, content, userId } = req.body; // Extract the note object

    // const user_id = req.session.id;
    // if (!user_id) {
    //     return res.json({ message: "Unauthorized. Please log in.", note: null, success : false });
    // }

    try {
        const result = await db.query("INSERT INTO notes (user_id, note_title, note_content) VALUES ($1, $2, $3) RETURNING *", [userId, title, content]);

        if (result.rows.length > 0) {
            res.status(201).json({ message: "Note added to db successfully.", note: result.rows[0], success : true });
        } else {
            res.json({ message: "Failed to create the note.", note: null, success : false  });
        }

    } catch(err) {
        console.error("Error creating note:", err);
        res.json({ message: "Server error. Failed to create the note.", note : null, success : false  })
    }
    
});

app.post("/get-notes", async (req, res) => { 
    // const user_id = req.session.id;
    // if (!user_id) {
    //     return res.json({ message: "Unauthorized. Please log in.", note: null, success : false });
    // }

    const { userId } = req.body

    const result = await db.query("SELECT * FROM notes WHERE user_id = $1", [userId]);

    try {
        const result = await db.query("SELECT * FROM notes WHERE user_id = $1", [userId]);

        if (result.rows.length > 0) {
            res.status(200).json({ message: "Notes fetched successfully.", notes: result.rows, success: true });
        } else {
            res.status(200).json({ message: "No notes found.", notes: [], success: true });
        }
    } catch (err) {
        console.error("Error fetching notes:", err);
        res.json({ message: "Server error. Failed to fetch notes.", notes: null, success: false });
    }

});

app.post("/delete-note", async (req, res) => { 
    const { noteId, userId } = req.body;

    try {
        const result = await db.query("DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *", [noteId, userId]);
        if (result.rows.length > 0) {
            res.status(200).json({ message: "Note deleted successfully.", success: true });
        } else {
            res.json({ message: "Note not found or unauthorized.", success: false });
        }
    } catch(err) {
        console.error("Error deleting note:", err);
        res.json({ message: "Server error. Failed to delete the note.", success: false });
    }
});


app.listen(port, () => {
    console.log("Server running on port " + port);
});
