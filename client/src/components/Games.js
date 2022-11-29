// displays the list of games and the gamelog for each game

import {useState, useEffect} from 'react';
import Table from './Table';

const Games = () => {

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getGames = async () => {
            const gamesFromServer = await fetchGames();
            setGames(gamesFromServer);
            setLoading(false);
        }
        getGames();
    }
    , []);

    const fetchGames = async () => {
        try {
            const res = await fetch('http://localhost:8000/games', {
                method: 'GET'
                });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <h1>Games</h1>
            {!loading && <Table table={games} />}
        </div>
    );
}

export default Games;