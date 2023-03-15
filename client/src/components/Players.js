import {useState, useEffect} from 'react';
import Table from './Table';

const Players = () => {

    const [players, setPlayers] = useState([]);
    const [playersLoading, setPlayersLoading] = useState(true);
    const [teams, setTeams] = useState([]); // to replace PlayerTeamId with TeamName
    const [teamsLoading, setTeamsLoading] = useState(true);
    const [userInput, setUserInput] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState([]);

    useEffect(() => {
        const getPlayers = async () => {
            const playersFromServer = await fetchPlayers();
            setPlayers(playersFromServer);
            setPlayersLoading(false);
        }
        const getTeams = async () => {
            const teamsFromServer = await fetchTeams();
            setTeams(teamsFromServer);
            setTeamsLoading(false);
        }
        getPlayers();
        getTeams();
    }, []);

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

    const fetchTeams = async () => {
        try {
            const res = await fetch('http://localhost:8000/teams', {
                method: 'GET'
                });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const replaceTeamIds = (players) => {
        if (teamsLoading || playersLoading) {
            return;
        }
        const newPlayers = players.map(player => {
            const team = teams.find(team => team.TeamID === player.PlayerTeamID);
            return {...player, PlayerTeamID: team.TeamName};
        });
        return newPlayers;
    }

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        const filteredPlayers = players.filter(player => player.PlayerName.toLowerCase().includes(userInput.toLowerCase()));
        setFilteredPlayers(filteredPlayers);
    }

    return (
        <div>
            <h1>Players</h1>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search for a player" value={userInput} onChange={handleUserInput} />
                <input type="submit" value="Search" />
            </form>
            {playersLoading || teamsLoading? <h3>loading...</h3> :
            (filteredPlayers.length > 0 ? <Table table={filteredPlayers} /> : <Table table={replaceTeamIds(players)} />)}
        </div>
    )
}

export default Players