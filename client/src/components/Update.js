import {useState, useEffect} from 'react';

// users can update a player, team, or game
// the user selects the type of object to update

const Update = () => {
    const [updateType, setUpdateType] = useState('player');
    const [playerList, setPlayerList] = useState([]);
    const [teamList, setTeamList] = useState([]);
    const [gameList, setGameList] = useState([]);
    const [player, setPlayer] = useState({}); 
    const [team, setTeam] = useState({});
    const [game, setGame] = useState({});

    // get the list of players, teams, and games
    useEffect(() => {
        fetch('http://localhost:8000/players')
            .then(res => res.json())
            .then(data => setPlayerList(data));
        fetch('http://localhost:8000/teams')
            .then(res => res.json())
            .then(data => setTeamList(data));
        fetch('http://localhost:8000/games')
            .then(res => res.json())
            .then(data => setGameList(data));
    }, []);

    // update the player, team, or game
    const handleSubmit = (e) => {
        e.preventDefault();
        const playerObj = player;
        const teamObj = team;
        const gameObj = game;
        if (updateType === 'player') {
            fetch('http://localhost:8000/players/' + playerObj.PlayerID, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(playerObj)
            });
        } else if (updateType === 'team') {
            fetch('http://localhost:8000/teams' + teamObj.TeamID, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(teamObj)
            });
        } else if (updateType === 'game') {
            fetch('http://localhost:8000/games' + gameObj.GameID, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(gameObj)
            });
        }
    }

    const findPlayer = (e) => {
        const playerID = e.target.value;
        const playerObj = playerList.find(player => player.PlayerID === parseInt(playerID));
        setPlayer(playerObj);
    }

    const findTeam = (e) => {
        const teamID = e.target.value;
        const teamObj = teamList.find(team => team.TeamID === parseInt(teamID));
        setTeam(teamObj);
    }

    const findGame = (e) => {
        const gameID = e.target.value;
        const gameObj = gameList.find(game => game.GameID === parseInt(gameID));
        setGame(gameObj);
    }

    const getTeamName = (teamID) => {
        const teamObj = teamList.find(team => team.TeamID === parseInt(teamID));
        return teamObj.TeamName;
    }

    return (
        <div>
            <h1>Update</h1>
            <form onSubmit={handleSubmit}>
                <select value={updateType} onChange={(e) => setUpdateType(e.target.value)}>
                    <option value="player">Player</option>
                    <option value="team">Team</option>
                    <option value="game">Game</option>
                </select>
                <br />
                <br />
                {updateType === 'player' && (
                    <div>
                        <select value={player} onChange={(e) => findPlayer(e)}>
                            <option value="">Select a player</option>
                            {playerList.map(player => (
                                <option key={player.PlayerID} value={player.PlayerID}>{player.PlayerName}</option>
                            ))}
                        </select>
                        <div>
                            <label>Player Name: </label>
                            <input type="text" value={player.PlayerName} onChange={(e) => setPlayer({...player, PlayerName: e.target.value})} />
                            <br />
                            <label>Player Height: </label>
                            <input type="text" value={player.PlayerHeight} onChange={(e) => setPlayer({...player, PlayerHeight: e.target.value})} />
                            <br />
                            <label>Player Age: </label>
                            <input type="text" value={player.PlayerAge} onChange={(e) => setPlayer({...player, PlayerAge: e.target.value})} />
                            <br />
                            <label>Player Weight: </label>
                            <input type="text" value={player.PlayerWeight} onChange={(e) => setPlayer({...player, PlayerWeight: e.target.value})} />
                            <br />
                            <label>Player Wingspan: </label>
                            <input type="text" value={player.PlayerWingspan} onChange={(e) => setPlayer({...player, PlayerWingspan: e.target.value})} />
                            <br />
                            <label>Player Team ID: </label>
                            <input type="text" value={player.PlayerTeamID} onChange={(e) => setPlayer({...player, PlayerTeamID: e.target.value})} />
                            <br />
                            <label>Player Position ID: </label>
                            <input type="text" value={player.PlayerPositionID} onChange={(e) => setPlayer({...player, PlayerPositionID: e.target.value})} />
                            <br />
                            <label>College: </label>
                            <input type="text" value={player.College} onChange={(e) => setPlayer({...player, College: e.target.value})} />
                            <br />
                            <label>Jersey Number: </label>
                            <input type="text" value={player.JerseyNumber} onChange={(e) => setPlayer({...player, JerseyNumber: e.target.value})} />
                            <br />
                            <label>Country: </label>
                            <input type="text" value={player.Country} onChange={(e) => setPlayer({...player, Country: e.target.value})} />
                            <br />
                            <label>Injury Status: </label>
                            <input type="text" value={player.InjuryStatus} onChange={(e) => setPlayer({...player, InjuryStatus: e.target.value})} />
                            <br />
                        </div>
                    </div>
                )}
                {updateType === 'team' && (
                    <div>
                        <select value={team} onChange={(e) => findTeam(e)}>
                            <option value="">Select a team</option>
                            {teamList.map(team => (
                                
                                <option key={team.TeamID} value={team.TeamID}>{team.TeamName}</option>
                            ))}
                        </select>      
                        <div>
                            <label>Name: </label>
                            <input type="text" value={team.TeamName} onChange={(e) => setTeam({...team, TeamName: e.target.value})} />
                            <br />
                            <label>City: </label>
                            <input type="text" value={team.City} onChange={(e) => setTeam({...team, City: e.target.value})} />
                            <br />
                            <label>Coach: </label>
                            <input type="text" value={team.CoachName} onChange={(e) => setTeam({...team, CoachName: e.target.value})} />
                            <br />
                            <label>Number of wins: </label>
                            <input type="text" value={team.NumberOfWins} onChange={(e) => setTeam({...team, NumberOfWins: e.target.value})} />
                            <br />
                            <label>Number of losses: </label>
                            <input type="text" value={team.NumberOfLosses} onChange={(e) => setTeam({...team, NumberOfLosses: e.target.value})} />
                            <br />
                        </div>
                    </div>
                )}
                {updateType === 'game' && (
                    <div>
                        <select value={game} onChange={(e) => findGame(e)}>
                        <option value="">Select a game</option>
                            {gameList.map(game => (
                                <option key={game.GameID} value={game.GameID}>{game.GameID + '. ' + getTeamName(game.GameHomeTeamID) + ' vs ' + getTeamName(game.GameAwayTeamID)}</option>
                            ))}
                        </select>
                        <div>
                            <label>Game Date: </label>
                            <input type="text" value={game.GameDate} onChange={(e) => setGame({...game, GameDate: e.target.value})} />
                            <br />
                            <label>Home Team ID: </label>
                            <input type="text" value={game.GameHomeTeamID} onChange={(e) => setGame({...game, GameHomeTeamID: e.target.value})} />
                            <br />
                            <label>Away Team ID: </label>
                            <input type="text" value={game.GameAwayTeamID} onChange={(e) => setGame({...game, GameAwayTeamID: e.target.value})} />
                            <br />
                            <label>Home Team Score: </label>
                            <input type="text" value={game.GameHomeTeamScore} onChange={(e) => setGame({...game, GameHomeTeamScore: e.target.value})} />
                            <br />
                            <label>Away Team Score: </label>
                            <input type="text" value={game.GameAwayTeamScore} onChange={(e) => setGame({...game, GameAwayTeamScore: e.target.value})} />
                            <br />

                        </div>
                    </div>
                )}
                <button onClick={handleSubmit}>Update</button>
            </form>
        </div>
    )
}

export default Update