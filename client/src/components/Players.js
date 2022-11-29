import {useState, useEffect} from 'react';
import Table from './Table';

const Players = () => {

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPlayers = async () => {
            const playersFromServer = await fetchPlayers();
            setPlayers(playersFromServer);
            setLoading(false);
        }
        getPlayers();
    }
    , []);

    const fetchPlayers = async () => {
        try {
            const res = await fetch('http://localhost:8000/players', {
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
            <h1>Players</h1>
            {!loading && <Table table={players} />}
        </div>
    );
}

export default Players;