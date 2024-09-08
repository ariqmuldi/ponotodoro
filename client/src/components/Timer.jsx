import { useState, useEffect, useContext, useRef} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsContext from '../context/SettingsContext';

function Timer() {
    const context = useContext(SettingsContext);
    const [isPaused, setIsPaused] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [mode, setMode] = useState('work') // Can be work, break, longbreak
    const [modeCounter, setModeCounter] = useState(0); // Was 0 before

    const isPausedRef = useRef(isPaused);
    const secondsLeftRef = useRef(secondsLeft);
    const modeRef = useRef(mode);
    const modeCounterRef = useRef(modeCounter);

    function initTimer() {
        const initialSeconds = context.workMinutes * 60;
        setSecondsLeft(initialSeconds);
        secondsLeftRef.current = initialSeconds;
    };

    function switchMode() {
        let nextMode = null;
        let nextSeconds = null;
        let nextModeCounter = modeCounterRef.current;

        if (nextModeCounter === 7) {
            nextMode = 'longbreak';
            nextSeconds = context.longBreakMinutes * 60;
            nextModeCounter = 0; // Reset mode counter after long break
        }
        else {
            if (modeRef.current === 'work') {
                nextMode = 'break';
                nextSeconds = context.breakMinutes * 60;
            } else {
                nextMode = 'work';
                nextSeconds = context.workMinutes * 60;
            }
            nextModeCounter += 1; // Increment mode counter
        }

        // Update state and refs for next mode
        setMode(nextMode);
        modeRef.current = nextMode;

        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;

        setModeCounter(nextModeCounter);
        modeCounterRef.current = nextModeCounter;
        
    }

    function decrementSecond() {
        secondsLeftRef.current = secondsLeftRef.current - 1;
        setSecondsLeft(secondsLeftRef.current);
        console.log("Ref secondsLeftRef: ", secondsLeftRef.current);
    }

    useEffect(() => {
        initTimer();
        const interval = setInterval(() => {
            if (isPausedRef.current) { return; }
            if (secondsLeftRef.current === 0) { return switchMode(); } // switchMode
            decrementSecond();
            
        }, 1000);

        return () => clearInterval(interval);
    }, [context]);

    // useEffect(() => {
    //     const checkSecondsLeft = () => {
    //         console.log("UI secondsLeft: ", secondsLeft);
    //     }
    //     checkSecondsLeft();
    // }, [secondsLeftRef.current]);

    let totalSeconds = -1;
    if(mode === "work") { totalSeconds = context.workMinutes * 60; }
    if(mode === "break") { totalSeconds = context.breakMinutes * 60; }
    if(mode === "longbreak") { totalSeconds = context.longBreakMinutes * 60; }
    const percentage = Math.round((secondsLeft / totalSeconds) * 100);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if(seconds < 10) { seconds = "0" + seconds; }

    return (
        <div className="timer-container d-flex flex-column align-items-center">
            <CircularProgressbar value={percentage} text={`${minutes}:${seconds} `} styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'round',
            // Colors
            pathColor: mode === "work" ? "#f54e4e" : mode === "break" ? "#4aec8c" : "#FF9874",
            textColor: '#fff',
            backgroundColor: `rgba(255, 255, 255, .2)`,
            })}/>

            <div className="buttons-container d-flex justify-content-center align-items-center gap-4 pt-2 pb-2">
                {isPaused ? <PlayCircleIcon onClick={() => { setIsPaused(false); isPausedRef.current = false; }}/> : 
                    <PauseCircleIcon onClick={() => { setIsPaused(true); isPausedRef.current = true; }} /> }
            </div>

            <div className="settingsButton-container d-flex justify-content-center align-items-center p-1">
                <SettingsIcon onClick= { () => context.setShowSettings(true)}/>
            </div>
        </div>
    );
}

export default Timer;
