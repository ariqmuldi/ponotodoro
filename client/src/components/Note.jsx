import { useState, useEffect, useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

function Note(props) {
    const [clickedItem, setClickedItem] = useState(null);

    const handleItemClick = (index) => {
        setClickedItem(index); 
        setTimeout(() => {
            props.onDel(index); 
            setClickedItem(null);
        }, 750);
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
                <p style={{ marginBottom: '10px', fontSize : '10px' }}>{props.content}</p>
                
            </div>
            <div className="d-flex align-items-center justify-content-center" style={{ marginTop: 'auto' }}>
                {clickedItem === props.id ? 
                    <CheckCircleOutlinedIcon style={{ color: 'green', fontSize: '10px' }} /> // Green checkmark icon
                    :
                    <DeleteIcon style={{ fontSize: '10px' }} onClick={() => handleItemClick(props.id)} /> // Delete icon
                }
            </div>
            
        </div>
    );
}

export default Note;