import { useState, useEffect, useContext, useRef} from 'react'
import "../scripts/FormValidation.js"
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';

function UserForm( { formType }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');  
    const [message, setMessage] = useState(''); 
    const [messageType, setMessageType] = useState('');

    const { register } = useContext(AuthContext);

    useEffect(() => {
        // Custom Bootstrap form validation script inside React's useEffect
        const forms = document.querySelectorAll('.needs-validation');

        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            }, false);
        });
    }, []);

    useEffect(() => {
        setUsername('');
        setEmail('');
        setPassword('');
    }, [formType]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        // Check if the form is valid
        if (form.checkValidity()) {
            // If valid, log values and reset the form
            console.log("Username: ", username);
            console.log("Email: ", email);
            console.log("Password: ", password);

            let response;
            try {
                if(formType === "register") {
                    response = await register(username, email, password);
                }
                else {
                    console.log("login") // login
                }

                setMessage(response.message);
                setMessageType(response.success ? 'success' : 'error');

            } catch(err) {
                console.log(err);
            }

            // Clear the form fields after successful submission
            setUsername('');
            setEmail('');
            setPassword('');

            // Reset the form validation classes (remove error highlighting)
            form.classList.remove('was-validated');
        } else {
            // If invalid, add the Bootstrap validation class to show errors
            form.classList.add('was-validated');
        }
    }

    function handleUsernameChange(e) {
        setUsername(e.target.value)
    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    return (
        <div className="d-flex flex-column align-items-center pt-2">
            {formType === "login" ?
            <p className="fw-bold"> Login to Ponotodoro</p>
            :
            <p className="fw-bold"> Register to Ponotodoro</p> 
            }

            <div className="d-flex align-items-center text-center justify-content-center" style={{ width: '100%', fontSize: '9px' }} > 
                <p className={messageType === 'error' ? 'text-danger ' : 'text-success '}>{message}</p>
            </div>

            <form className="row needs-validation" noValidate onSubmit={handleSubmit}>
                {formType === "login" ?
                null
                :
                <div className="d-flex flex-column align-items-center text-center pb-3" style={{fontSize : '10px'}}>
                    <label className="validationCustom01 form-label">Username</label>
                    <input type="text" className="form-control" id="validationCustom01" style={{ 
                    padding: '2px 3px',  // Reduces padding
                    lineHeight: '1.2',   // Controls the line height
                    height: '20px',       // Sets a smaller height
                    fontSize: '8px',
                    width : '150px'
                    }} onChange={handleUsernameChange} value={username} required />
                    <div className="invalid-feedback" style={{fontSize : '8px'}}>
                        Please provide a valid username.
                    </div>
                </div>
                }

                <div className="d-flex flex-column align-items-center text-center pb-3" style={{fontSize : '10px'}}>
                    <label className="validationCustom02 form-label">Email</label>
                    <input type="email" className="form-control" id="validationCustom02" style={{ 
                    padding: '2px 3px',  // Reduces padding
                    lineHeight: '1.2',   // Controls the line height
                    height: '20px',       // Sets a smaller height
                    fontSize: '8px',
                    width : '150px'
                    }} onChange={handleEmailChange} value={email} required />
                    <div className="invalid-feedback" style={{fontSize : '8px'}}>
                        Please provide a valid email.
                    </div>
                </div>

                <div className="d-flex flex-column align-items-center text-center pb-3" style={{fontSize : '10px'}}>
                    <label className="validationCustom03 form-label">Password</label>
                    <input type="password" className="form-control" id="validationCustom03" style={{ 
                    padding: '2px 3px',  // Reduces padding
                    lineHeight: '1.2',   // Controls the line height
                    height: '20px',       // Sets a smaller height
                    fontSize: '8px',
                    width : '150px'
                    }} onChange={handlePasswordChange} value={password} required />
                    <div className="invalid-feedback" style={{fontSize : '8px'}}>
                        Please provide a valid password.
                    </div>
                </div>

                <div className="d-flex flex-column align-items-center col-12 pt-1">
                    <button className="btn btn-primary" type="submit" style={{
                        fontSize: '8px',   // Reduces font size
                        padding: '2px 5px', // Reduces padding for smaller appearance
                        height: '20px',    // Controls button height
                        width: '60px',     // Sets button width
                        backgroundColor: '#5C5470',  // Button background color
                        border: '1px solid #5C5470',  // Button border color
                        color: '#FFF4EA'
                    }}>Submit</button>
                </div>
            </form>
            

        </div>
    );
}

export default UserForm;
