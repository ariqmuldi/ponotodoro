import { useState, useEffect } from 'react';
import axios from 'axios';
import Timer from './components/Timer';
import Settings from './components/Settings';
import SettingsContext from './context/SettingsContext';
import Input from './components/Input';
import InputItems from './components/InputItems';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import { AuthProvider } from './context/AuthContext';

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
    <AuthProvider>
      
    <Router>
      <Routes>
        <Route exact path = "/" element = {
          <>
            <div className="main-container d-flex flex-column justify-content-center">
              <SettingsContext.Provider value ={ { workMinutes, breakMinutes, longBreakMinutes, 
              setWorkMinutes, setBreakMinutes, setLongBreakMinutes, showSettings, setShowSettings } } >

                <div className="header-container">
                  <Header onForm={false} />
                </div>

                <div className="timer-settings-container d-flex flex-column align-items-center w-100">
                  {showSettings ? <Settings /> : <Timer /> }
                </div>


                {!showSettings && (
                <>
                  <div className="input-container mb-3">
                    <Input allInputs={allInputs} setAllInputs={setAllInputs} />
                  </div>

                  <InputItems allInputs={allInputs} removeItem={removeItem} />
                </>
                )};

              </SettingsContext.Provider>
      
            </div>
          </>
        } >
        </Route>

        <Route exact path = "/register" element = {
          <>
            <div className="main-container d-flex flex-column justify-content-center">
              <SettingsContext.Provider value ={ { workMinutes, breakMinutes, longBreakMinutes, 
              setWorkMinutes, setBreakMinutes, setLongBreakMinutes, showSettings, setShowSettings } } >

                <div className="header-container">
                  <Header onForm={true} />
                </div>

                <div className="userForm-container">
                  <UserForm formType={'register'} />
                </div>

              </SettingsContext.Provider>

            </div>

          </>
        } >
        </Route>

        <Route exact path = "/login" element = {
          <>
            <div className="main-container d-flex flex-column justify-content-center">
              <SettingsContext.Provider value ={ { workMinutes, breakMinutes, longBreakMinutes, 
              setWorkMinutes, setBreakMinutes, setLongBreakMinutes, showSettings, setShowSettings } } >

                <div className="header-container">
                  <Header onForm={true} />
                </div>

                <div className="userForm-container">
                  <UserForm formType={'login'} />
                </div>

              </SettingsContext.Provider>

            </div>

          </>
        } >
        </Route>
      </Routes>
    </Router>

    </AuthProvider>
    
    
  );
}

export default App;
