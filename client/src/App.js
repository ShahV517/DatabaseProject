import {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Add from './components/Add';
import Players from './components/Players';
import Teams from './components/Teams';
import Games from './components/Games';

const App = () => {
    return (
        <div>
            <Navbar />
            <br />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<Add />} />
                <Route path="/players" element={<Players />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/games" element={<Games />} />
            </Routes>
        </div>
    );
}

export default App;