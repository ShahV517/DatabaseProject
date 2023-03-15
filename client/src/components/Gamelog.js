import {useState , useEffect} from 'react';
import Table from './Table';


const Gamelog = () => {
    
    const [games, setGames] = useState([]);
    const [gameloading, setGameLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    const [teamloading, setTeamLoading] = useState(true);
    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    const [selectedGames, setSelectedGames] = useState([]);
    const [gameLog, setGameLog] = useState([]);
    const [gamesSubmitted, setGamesSubmitted] = useState(false);
    const [gameLogSubmitted, setGameLogSubmitted] = useState(false);

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

    const fetchGameLog = async (gameId) => {
        try {
            const res = await fetch(`http://localhost:8000/gameLogs/${gameId}`, {
                method: 'GET'
                });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }


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

    const handleGamesSearch = (e) => {
        e.preventDefault();
        const newGames = convertGames(games);
        const filteredGames = newGames.filter((game) => {
            return game.GameHomeTeamID === homeTeam || game.GameAwayTeamID === awayTeam;
        }
        )
        setSelectedGames(filteredGames);
        setGamesSubmitted(true);
        setGameLogSubmitted(false);
    }

    const handleGameLogSearch = async (e) => {
        if (parseInt(e.target.value) === -1) {
            setGameLogSubmitted(false);
            return;
        }
        e.preventDefault();
        const selectedGame = selectedGames.find((game) => game.GameID === parseInt(e.target.value));
        const newGameLog = await fetchGameLog(selectedGame.GameID);
        setGameLog(newGameLog);
        setGameLogSubmitted(true);
    }

    const handleHomeTeamChange = (e) => {
        setHomeTeam(e.target.value);
    }

    const handleAwayTeamChange = (e) => {
        setAwayTeam(e.target.value);
    }

    return (
        <div>
            <h1>Gamelog</h1>
            <br />
            <form onSubmit={handleGamesSearch}>
                <label>Home Team: </label>
                <input type="text" value={homeTeam} onChange={handleHomeTeamChange} />
                <label>Away Team: </label>
                <input type="text" value={awayTeam} onChange={handleAwayTeamChange} />
                <input type="submit" value="Search" />
            </form>
            {gamesSubmitted &&
            <div>
            <select onChange={handleGameLogSearch}>
                <option value="-1">Select a game</option>
                {selectedGames.map((game) => (
                    <option value={game.GameID}>{game.GameDate} {game.GameHomeTeamID} vs {game.GameAwayTeamID}</option>
                ))}
            </select>
            </div>
            }
            {gameLogSubmitted && <Table table={gameLog} />}
        </div>
    );
}

export default Gamelog;