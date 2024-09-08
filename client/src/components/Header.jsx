import { useState, useEffect, useContext, useRef} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsContext from '../context/SettingsContext';

function Header() {
    const context = useContext(SettingsContext);

    return (
        <div className="d-flex align-items-center justify-content-start" style={{ width: '100%' }}>
            {/* Ponotodoro text */}
            <div className="d-flex align-items-center">
                <span className="ms-2" style={{ color: "#5C5470", fontSize: "10px" }}> Ponotodoro </span>
            </div>

            {/* Dropdown Menu and Settings */}
            <div className="d-flex align-items-center ms-auto" style={{ marginRight: '5px' }}>
                {/* Dropdown Menu */}
                <div className="dropdown">
                    <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <AccountCircleIcon style={{ color: "#5C5470", fontSize: "20px" }}/>
                    </a>
                    <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownUser1">
                        <li><a className="dropdown-item" href="#" style={{ fontSize: "8px" }}>Sign In</a></li>
                        <li><a className="dropdown-item" href="#" style={{ fontSize: "8px" }}>Register</a></li>
                    </ul>
                </div>

                {/* Settings Icon */}
                <div className="ms-1">
                    <SettingsIcon style={{ color: "#5C5470", fontSize: "20px" }} onClick= {() => context.setShowSettings(true)} />
                </div>
            </div>
        </div>
    );
}

export default Header;
