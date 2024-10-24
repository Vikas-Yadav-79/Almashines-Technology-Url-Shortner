import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Update this line
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import './App.css';
import Login from './pages/Login/Login';
import Signup from './pages/Signup';

const App = () => {
    return (
        <Router>
            <Routes> 
                <Route path="/" element={<Home />} /> 
                <Route path="/analytics/:shortUrl" element={<Analytics />} /> 
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
        </Router>
    );
};

export default App;
