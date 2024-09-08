import { useState, useEffect, useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
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
                <DeleteIcon style={{ fontSize: '10px' }}/>
            </div>
            
        </div>
    );
}

export default Note;