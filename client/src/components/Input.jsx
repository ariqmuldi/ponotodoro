import { useState, useEffect, useContext, useRef} from 'react'

function Input() {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setInputValue(""); // Reset the input value after submitting
    };

    return (
        <div className="d-flex justify-content-center align-items-center input-main-container text-center">
            <form onSubmit={handleSubmit}> 
                <input className="form-control input-input-container text-center" type="text" id="inputText" placeholder="What would you like to accomplish?" 
                value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            </form>
        </div>
    );
}

export default Input;
