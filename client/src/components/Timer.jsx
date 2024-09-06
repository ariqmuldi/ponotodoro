import { useState, useEffect, useContext} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsContext from '../context/SettingsContext';

function Timer() {
    const context = useContext(SettingsContext);

    return (
        <div className="timer-container d-flex flex-column align-items-center">
            <CircularProgressbar value={60} text={`${60}%`} styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'round',
            // Colors
            pathColor: `#f54e4e`,
            textColor: '#fff',
            backgroundColor: `rgba(255, 255, 255, .2)`,
            })}/>

            <div className="buttons-container d-flex justify-content-center align-items-center gap-4 pt-3">
                <PlayCircleIcon />
                <PauseCircleIcon />
            </div>

            <div className="settingsButton-container d-flex justify-content-center align-items-center p-1">
                <SettingsIcon onClick= { () => context.setShowSettings(true)}/>
            </div>
        </div>
    );
}

export default Timer;