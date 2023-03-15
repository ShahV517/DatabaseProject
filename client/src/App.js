import {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Add from './components/Add';
import Players from './components/Players';
import Teams from './components/Teams';
import Games from './components/Games';
import Gamelog from './components/Gamelog';
import Update from './components/Update';
import Delete from './components/Delete';
import Query from './components/Query';

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
                <Route path="/gamelog" element={<Gamelog />} />
                <Route path="/update" element={<Update />} />
                <Route path="/delete" element={<Delete />} />
                <Route path="/query" element={<Query />} />
            </Routes>
        </div>
    );
}

export default App;