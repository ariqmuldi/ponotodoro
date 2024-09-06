import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import env from 'dotenv'
import Timer from './components/Timer'
import Settings from './components/Settings'

function App() {
  const [showSettings, setShowSettings] = useState(false);

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
      <div className="timer-settings-container d-flex flex-column align-items-center w-100">
        {showSettings ? <Settings /> : <Timer /> }
      </div>
    </div>
    
  );
}

export default App;
