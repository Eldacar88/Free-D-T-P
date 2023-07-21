import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigationbar from './Components/Navigationbar/Navigationbar';
import Home from './Components/Home/Home';
import Overallplanningoverview from './Components/Overallplanning/Overallplanningoverview';
import Newoverallplanning from './Components/Overallplanning/Newoverallplanning';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Welcome from './Components/Welcome/Welcome';
import Resetpage from './Components/Resetpage/Resetpage';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMonth } from './Components/Overallplanning/util';
import { Link, Navigate } from "react-router-dom";


function App() {

  const [token, setToken] = useState(null);
  const [isloggedIn, setLoggedIn] = useState(false);
  const [resetAllowed,setResetAllowed] = useState(false);
  const [resetNumber, setResetNumber] = useState(0);
  // true = coach false = athlet
  const [userRole, setUserRole] = useState("athlet");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      setLoggedIn(true);
      //setToken(token);
    }
  },[])

  const handleLogout = () => {
    setLoggedIn(false);
    setToken(null);
    localStorage.removeItem("token");
  };
  
  const handleLogin = ()  => {
    setLoggedIn(true);
    setToken(localStorage.getItem("token"));
  };

  return (
    <div className="App">
      <Router>
        <Navigationbar handleLogout={handleLogout} userRole={userRole} setUserRole={setUserRole}/>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          
          <Route path="/home" element={isloggedIn ? <Home/> : <Navigate to="/" replace/>}/>

          <Route path='/overallplanningoverview' element={isloggedIn ? <Overallplanningoverview userRole={userRole} setUserRole={setUserRole}/> : <Navigate to="/" replace/>}/>

          <Route path='/newoverallplanning' element={isloggedIn ? <Newoverallplanning userRole={userRole} setUserRole={setUserRole}/> : <Navigate to="/" replace/>}/>

          <Route path='/login' element ={<Login handleLogin={handleLogin} userRole={userRole} setUserRole={setUserRole}/>}/>

          <Route path='/register' element ={<Register/>}/>

          <Route path="/reset/askEmail" element={<Resetpage text={"Type in your Email to reset passwort"} resetNumber={resetNumber} setResetNumber={setResetNumber}/>}/>
          
          <Route path="/reset/verify" element={<Resetpage text={"Type in the code you received via Email"} resetNumber={resetNumber} 
            setResetAllowed={setResetAllowed} setResetNumber={setResetNumber}/>}/>
          
          <Route path="/reset/newPassword" element={ resetAllowed ?<Resetpage text={"Type in your new Password"}/> : <Navigate to="/login"/>}/>

        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
