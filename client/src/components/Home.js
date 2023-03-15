import {useState, useEffect} from 'react';
import Table from './Table';

// displays the 5 most recent games and replace team ids with team names
const Home = () => {
    const [games, setGames] = useState([]);
    const [gameloading, setGameLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    const [teamloading, setTeamLoading] = useState(true);

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
    }, []);

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
            const homeTeam = teams.find((team) => team.TeamID === game.GameHomeTeamID);
            const awayTeam = teams.find((team) => team.TeamID === game.GameAwayTeamID);
            return {...game, GameHomeTeamID: homeTeam.TeamName, GameAwayTeamID: awayTeam.TeamName};
        })
        return newGames;
    }

    // display the 5 most recent games
    const displayGames = (games) => {
        const newGames = games.slice(0, 5);
        // sort the games by date
        newGames.sort((a, b) => {
            return new Date(b.GameDate) - new Date(a.GameDate);
        })
        return newGames;
    }

    return (
        <div>
            <h1>Home</h1>
            {(gameloading || teamloading) ? <h2>Loading...</h2> : <Table table={displayGames(replaceTeamIds(games))} />}
        </div>
    )
}

export default Home