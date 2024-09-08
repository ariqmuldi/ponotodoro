import express from "express"
import cors from "cors"
import env from 'dotenv'

const app = express();
env.config({ path: '../client/.env' });

const corsOptions = { origin : [process.env.VITE_ADDRESS]} // Port Vite servers run on
app.use(cors(corsOptions))
const port = 8080;

app.get("/api", (req, res) => {
    res.json( {"fruits" : ["apple", "orange", "banana"]} );
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});