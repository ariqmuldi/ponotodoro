import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import env from 'dotenv'
import Timer from './components/Timer'
import Settings from './components/Settings'
import SettingsContext from './context/SettingsContext'

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);

  const fetchApi = async () => {
    const response = await axios.get(import.meta.env.VITE_BACKEND_ADDRESS + "api"); 
    // const response = await axios.get(`${import.meta.env.VITE_BACKEND_ADDRESS}api`);
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchApi();
  }, [])

  return (
    <div className="main-container d-flex justify-content-center pt-5">
      <div className="timer-settings-container d-flex flex-column align-items-center w-100 mb-5">
        <SettingsContext.Provider value ={ { workMinutes, breakMinutes, longBreakMinutes, 
          setWorkMinutes, setBreakMinutes, setLongBreakMinutes, showSettings, setShowSettings} } >
          {showSettings ? <Settings /> : <Timer /> }
        </SettingsContext.Provider>
      </div>
    </div>
    
  );
}

export default App;
