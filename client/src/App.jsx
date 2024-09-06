import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import env from 'dotenv'

function App() {
  const [count, setCount] = useState(0);

  const fetchApi = async () => {
    const response = await axios.get(import.meta.env.VITE_BACKEND_ADDRESS + "api"); 
    // const response = await axios.get(`${import.meta.env.VITE_BACKEND_ADDRESS}api`);
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchApi();
  }, [])

  return (
    <div>
    </div>
  )
}

export default App
