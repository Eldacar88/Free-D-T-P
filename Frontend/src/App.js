import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigationbar from './Components/Navigationbar/Navigationbar';
import Home from './Components/Home/Home';
import Overallplanningoverview from './Components/Overallplanning/Overallplanningoverview';
import Newoverallplanning from './Components/Overallplanning/Newoverallplanning';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Welcome from './Components/Welcome/Welcome';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMonth } from './Components/Overallplanning/util';
import { Link, Navigate } from "react-router-dom";



function App() {

  const [token, setToken] = useState(null);
  const [isloggedIn, setLoggedIn] = useState(false);

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
        <Navigationbar handleLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<Welcome/>}/>

          <Route path="/home" element={isloggedIn ? <Home/> : <Navigate to="/" replace/>}/>

          <Route path='/overallplanningoverview' element={isloggedIn ? <Overallplanningoverview/> : <Navigate to="/" replace/>}/>

          <Route path='/newoverallplanning' element={isloggedIn ? <Newoverallplanning/> : <Navigate to="/" replace/>}/>

          <Route path='/login' element ={<Login handleLogin={handleLogin}/>}/>

          <Route path='/register' element ={<Register/>}/>

          

        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
