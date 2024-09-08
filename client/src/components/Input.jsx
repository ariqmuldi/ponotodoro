import { useState, useEffect, useContext, useRef} from 'react'

function Input( {allInputs, setAllInputs} ) {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) { // Check if the input is not empty or just whitespace
            setAllInputs([...allInputs, inputValue]); // Create a new array and add the input value
            console.log([...allInputs, inputValue]); // Log the updated array
            setInputValue(""); // Reset the input value after submitting
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center input-main-container text-center" style = {{marginTop: "-5px"}}>
            <form onSubmit={handleSubmit}> 
                <input className="form-control input-input-container text-center" type="text" id="inputText" placeholder="What would you like to accomplish?" 
                value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            </form>
        </div>
    );
}

export default Input;
