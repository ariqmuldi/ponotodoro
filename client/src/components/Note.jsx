import { useState, useEffect, useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function Note(props) {
    const [clickedItem, setClickedItem] = useState(null);

    const { user, register, login, logout } = useContext(AuthContext);

    const handleItemClick = () => {
        setClickedItem(props.id);
        setTimeout(() => {
            handleDeleteNote();
            setClickedItem(null);
        }, 750);
    };

    const handleDeleteNote = async () => {
        if (user) {
            try {
                console.log(props.id);
                console.log(user.id);
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_ADDRESS}delete-note`, {
                    noteId: props.id, // Pass the note's ID
                    userId: user.id   // Pass the user's ID
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });
    
                if (response.data.success) {
                    props.onDel(props.id); // Trigger the deletion from the state in App component
                } else {
                    console.log(response.data.message);
                }
            } catch (error) {
                console.error("Error deleting note:", error);
            }
        }
        else {
            props.onDel(props.id);
        }
        
    };

    return (
        <div className="note col-12 d-flex flex-column justify-content-start text-center">
            <div 
                className="p-3 rounded" 
                style={{ 
                    width: '100%', 
                    wordWrap: 'break-word', // This ensures long words break and wrap within the div
                    overflowWrap: 'break-word', // Ensures that long words wrap within the container
                    whiteSpace: 'normal', // This ensures that the text doesn't stay on one line, allowing wrapping
                    flexGrow : 1
                }}>
                <h5 style={{ marginBottom: '10px', marginTop: '0', fontSize : '12px' }}>{props.title}</h5>
                <p style={{ marginBottom: '10px', fontSize : '9px' }}>{props.content}</p>
                
            </div>
            <div className="d-flex align-items-center justify-content-center" style={{ marginTop: 'auto' }}>
                {clickedItem === props.id ? 
                    <CheckCircleOutlinedIcon style={{ color: 'green', fontSize: '9px' }} /> // Green checkmark icon
                    :
                    <DeleteIcon style={{ fontSize: '9px' }} onClick={() => handleItemClick(props.id)} /> // Delete icon
                }
            </div>
            
        </div>
    );
}

export default Note;