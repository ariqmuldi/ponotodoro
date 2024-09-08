import { useState, useEffect, useContext, useRef} from 'react'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

function InputItems( { allInputs, removeItem }) {
    const [clickedItem, setClickedItem] = useState(null);

    const handleItemClick = (index) => {
        setClickedItem(index); 
        setTimeout(() => {
            removeItem(index); 
            setClickedItem(null);
        }, 750);
    };

    const listItems = allInputs.map( (item, index) => {
        return (
        <div key={index} className="col-3 d-flex align-items-center justify-content-center mb-3" onClick={() => handleItemClick(index)}>
            <span key={index} className="d-flex align-items-center" style={{ gap: '8px' }} > 
                {clickedItem === index ? (
                    <CheckCircleOutlinedIcon style={{ fontSize: '12px', color: 'green' }} />
                ) : (
                    <CircleOutlinedIcon style={{ fontSize: '12px', color: 'gray' }} />
                )}
                <span style={{ fontSize: '12px' }}>{item}</span>
            </span>
            
        </div>
    );
    })

    return (
        <div className="row d-flex justify-content-center align-items-center" style={{ flexWrap: 'wrap', width: '100%' }}>
            {listItems}
        </div>
    );
}

export default InputItems;
