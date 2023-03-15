// displays the list of games and the gamelog for each game

import {useState, useEffect} from 'react';
import Table from './Table';

const Games = () => {

    const [games, setGames] = useState([]);
    const [gameloading, setGameLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    const [teamloading, setTeamLoading] = useState(true);
    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    const [filteredGames, setFilteredGames] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const getGames = async () => {
            const gamesFromServer = await fetchGames();
            setGames(gamesFromServer);
            setGameLoading(false);
        }
        const getTeams = async () => {
            const teamsFromServer = await fetchTeams();
            setTeams(teamsFromServer);
            setTeamLoading(false);
        }
        getGames();
        getTeams();
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

    // replace team ids with team names
    const replaceTeamIds = (games) => {
        if (teamloading || gameloading) {
            return;
        }
        const newGames = games.map((game) => {
            const hometeam = teams.find((team) => team.TeamID === game.GameHomeTeamID);
            const awayteam = teams.find((team) => team.TeamID === game.GameAwayTeamID);
            return {...game, GameHomeTeamID: hometeam.TeamName, GameAwayTeamID: awayteam.TeamName};
        })
        return newGames;
    }

    const convertDate = (games) => {
        const newGames = games.map((game) => {
            const date = new Date(game.GameDate);
            const newDate = date.toLocaleDateString();
            return {...game, GameDate: newDate};
        })
        return newGames;
    }

    const convertGames = (games) => {
        return convertDate(replaceTeamIds(games));
    }

    const handleHomeTeamChange = (e) => {
        setHomeTeam(e.target.value);
    }

    const handleAwayTeamChange = (e) => {
        setAwayTeam(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const convertedGames = convertGames(games);
        const filteredGames = convertedGames.filter((game) => {
            return game.GameHomeTeamID.toLowerCase().includes(homeTeam.toLowerCase()) && game.GameAwayTeamID.toLowerCase().includes(awayTeam.toLowerCase());
        })
        setFilteredGames(filteredGames);
        setSubmitted(true);
    }

    return (
        <div>
            <h1>Games</h1>
            <form onSubmit={handleSearch}>
                <label>Home Team</label>
                <input type="text" value={homeTeam} onChange={handleHomeTeamChange}></input>
                <label>Away Team</label>
                <input type="text" value={awayTeam} onChange={handleAwayTeamChange}></input>
                <button type="submit">Search</button>
            </form>
            {(gameloading || teamloading) ? <div>Loading...</div> :
            (filteredGames.length > 0 ? <Table table={filteredGames} /> : 
            submitted ? <h3>No teams found</h3> : <Table table={convertGames(games)} />)
            }

        </div>
    )
}

export default Games;