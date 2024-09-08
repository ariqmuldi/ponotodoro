import { useState, useEffect, useContext, useRef} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsContext from '../context/SettingsContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header( { onForm }) {
    const context = useContext(SettingsContext);
    const navigate = useNavigate();

    const { user, register, login, logout } = useContext(AuthContext);

    const [logoutMessage, setLogoutMessage] = useState('');

    const handleLogout = async () => {
        try {
            await logout();  // Call the logout function from AuthContext

            setLogoutMessage('Log out successful!');

            setTimeout(() => {
                setLogoutMessage('');
                // Redirect to homepage after logout
            }, 3000);  // 3000ms = 3 seconds

            navigate('/');
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-start" style={{ width: '100%' }}>
            {/* Ponotodoro text */}
            <div className="d-flex align-items-center">
                {onForm ? 
                    <span className="ms-2" style={{ color: "#5C5470", fontSize: "10px" }} onClick={ () => navigate('/') } > Ponotodoro </span>
                    :
                    <span className="ms-2" style={{ color: "#5C5470", fontSize: "10px" }} onClick={ () => context.setShowSettings(false) } > Ponotodoro </span>
                }
            </div>

            {/* Dropdown Menu and Settings */}
            <div className="d-flex align-items-center ms-auto" style={{ marginRight: '5px' }}>
                {/* Dropdown Menu */}
                <div className="dropdown">
                    <a className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <AccountCircleIcon style={{ color: "#5C5470", fontSize: "20px" }}/>
                    </a>
                    <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownUser1">
                        {user === null ?
                        <>
                            <li><a className="dropdown-item" onClick={() => navigate('/login') } style={{ fontSize: "8px" }}>Sign In</a></li>
                            <li><a className="dropdown-item" onClick={() => navigate('/register') } style={{ fontSize: "8px" }}>Register</a></li>
                        </>
                        :
                        <>
                            <li><a className="dropdown-item" onClick={handleLogout} style={{ fontSize: "8px" }}>Sign Out</a></li>
                        </>
                        }
                        
                    </ul>
                </div>

                {/* Settings Icon */}
                <div className="ms-1">
                    <SettingsIcon style={{ color: "#5C5470", fontSize: "20px" }} onClick= {() => context.setShowSettings(true) } />
                </div>

                {logoutMessage && (
                <div className="alert alert-success position-fixed top-0 start-50 translate-middle-x mt-1" style={{ 
                    fontSize: '8px', 
                    padding: '2px 5px', 
                    zIndex: 9999,     // Ensure it appears on top
                    width: '15%',    // Full width to cover the screen
                    textAlign: 'center',
                    
                    top: '20px'
                }}>
                    {logoutMessage}
                </div>
                )}
            </div>
        </div>
    );
}

export default Header;
