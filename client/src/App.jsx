import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import env from 'dotenv'
import Timer from './components/Timer'
import Settings from './components/Settings'
import SettingsContext from './context/SettingsContext'
import Input from './components/Input'
import InputItems from './components/InputItems'

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);

  const [allInputs, setAllInputs] = useState([]);

  const removeItem = (index) => {
    const newInputs = allInputs.filter((_, i) => i !== index); // Filter out the clicked item
    setAllInputs(newInputs); // Update the state
  };

  const fetchApi = async () => {
    const response = await axios.get(import.meta.env.VITE_BACKEND_ADDRESS + "api"); 
    // const response = await axios.get(`${import.meta.env.VITE_BACKEND_ADDRESS}api`);
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchApi();
  }, [])

  return (
    <div className="main-container d-flex flex-column justify-content-center pt-5">

      <div className="timer-settings-container d-flex flex-column align-items-center w-100">
        <SettingsContext.Provider value ={ { workMinutes, breakMinutes, longBreakMinutes, 
          setWorkMinutes, setBreakMinutes, setLongBreakMinutes, showSettings, setShowSettings} } >
          {showSettings ? <Settings /> : <Timer /> }
        </SettingsContext.Provider>
      </div>

      <div className="input-container mb-3">
        <Input allInputs={allInputs} setAllInputs={setAllInputs} />
      </div>

      <InputItems allInputs={allInputs} removeItem={removeItem}/>
      
    </div>
    
  );
}

export default App;
