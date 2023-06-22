import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigationbar from './Components/Navigationbar/Navigationbar';
import Home from './Components/Home/Home';
import Overallplanningoverview from './Components/Overallplanning/Overallplanningoverview';
import Newoverallplanning from './Components/Overallplanning/Newoverallplanning';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMonth } from './Components/Overallplanning/util';



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
          <Route path="/" element={<Home/>}/>

          <Route path='/overallplanningoverview' element={<Overallplanningoverview/>}/>

          <Route path='/newoverallplanning' element={<Newoverallplanning/>}/>

          <Route path='/login' element ={<Login handleLogin={handleLogin}/>}/>

          <Route path='/register' element ={<Register/>}/>

        </Routes>

        
      </Router>
    </div>
  );
}

export default App;
