import { useState, useEffect, useContext } from 'react'
import ReactSlider from 'react-slider'
import SettingsContext from '../context/SettingsContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Settings() {
    const context = useContext(SettingsContext);

    return (
        <div className="settings-container d-flex flex-column">
            <div className="d-flex flex-column align-items-center pb-4">
                <p className="h6 pb-1"> Work Minutes: {context.workMinutes}:00 </p>
                <ReactSlider className={'slider'} 
                thumbClassName ={'thumb'}
                trackClassName={'track'}
                value={context.workMinutes}
                onChange={newValue => context.setWorkMinutes(newValue)}
                min={1}
                max={60} />
            </div>
            <div className="d-flex flex-column align-items-center pb-4">
                <p className="h6 pb-1"> Break Minutes: {context.breakMinutes}:00 </p>
                <ReactSlider className={'slider green'} 
                thumbClassName ={'thumb'}
                trackClassName={'track'}
                value={context.breakMinutes}
                onChange={newValue => context.setBreakMinutes(newValue)}
                min={1}
                max={30} />
            </div>
            <div className="d-flex flex-column align-items-center">
                <p className="h6 pb-1"> Long Break Minutes: {context.longBreakMinutes}:00 </p>
                <ReactSlider className={'slider orange'} 
                thumbClassName ={'thumb'}
                trackClassName={'track'}
                value={context.longBreakMinutes}
                onChange={newValue => context.setLongBreakMinutes(newValue)}
                min={1}
                max={60} />
            </div>
            <div className="d-flex flex-column align-items-center pt-4">
                <ArrowBackIcon onClick={ () => context.setShowSettings(false)}/>
            </div>
        </div>
    );
}

export default Settings;
