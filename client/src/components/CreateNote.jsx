import { useState, useEffect, useContext, useRef} from 'react'
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function CreateNote(props) {
    const [note, setNote] = useState( {
        title : "",
        content : ""
    });

    const [isExpanded, setIsExpanded] = useState(false);

    const { user, register, login, logout } = useContext(AuthContext);

    function handleChange(e) {
        const {name, value} = e.target;

        setNote( (prev) => { return { 
            ...prev, [name] : value
        }});
        
    }

    async function handleClick(e) {
        e.preventDefault();
        // props.onAdd(note);

        if (user) {
            try {
                const response = await axios.post(import.meta.env.VITE_BACKEND_ADDRESS + "create-note", { title: note.title, content: note.content, userId : user.id},
                    { headers: { 'Content-Type': 'application/json' } }
                );
                console.log("Note created:", response.data);
                props.onAdd(response.data.note);
            } catch (e) {
                console.error("Error creating note:", e);
            }
        } else {
            console.log("User is null. Cannot create recieve note.");
            props.onAdd(note);
        }
 
        setNote({ title : "", content : "" })
        setIsExpanded(false);
    }

    function handleExpand() {
      setIsExpanded(true);
    }

    return (
        <div className="mt-3">  
            <form 
              className="create-note d-flex flex-column align-items-center justify-content-center mb-3"
              style={{ width: '100%', marginTop: '-5px'}}  // Ensure the form takes full width
            >
                {/* Title input */}
                {isExpanded && (
                    <input className="title-note-container text-center"
                        onChange={handleChange} 
                        name="title" 
                        placeholder="Title" 
                        value={note.title} 
                        // Full width input with padding
                    />
                )}
                {/* Textarea input */}
                <textarea className="write-note-container text-center"
                    onClick={handleExpand} 
                    onChange={handleChange} 
                    name="content" 
                    placeholder="Take a note..." 
                    rows={isExpanded ? 3 : 1} 
                    value={note.content} 
                    style={{ width: '25%', maxWidth: '500px', fontSize : '10px',  border: 'none', outline: 'none', backgroundColor: 'transparent'}}  // Full width textarea with padding
                />
                {/* Zoom and Fab button */}
                <Zoom in={isExpanded}>
                    <Fab className="" size="small" onClick={handleClick} style={{
                            marginTop: '-10px',
                            width: '20px',   // Control width of the Fab button
                            height: '20px',  // Control height of the Fab button
                            minHeight: '20px', // Override the default minHeight
                            padding: '5px',  // Adjust padding to make it smaller
                        }}>
                        <AddIcon style={{ fontSize: '12px' }} />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateNote;
