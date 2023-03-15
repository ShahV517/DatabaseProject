import {useState, useEffect} from 'react';

// users can delete a player, team, or game
// the user selects the type of object to delete

const Delete = () => {
    const [deleteType, setDeleteType] = useState('player');
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
    }
    , []);

    // delete the player, team, or game
    const handleSubmit = (e) => {
        e.preventDefault();
        const playerObj = player;
        const teamObj = team;
        const gameObj = game;
        if (deleteType === 'player') {
            fetch('http://localhost:8000/players/' + playerObj.PlayerID, {
                method: 'DELETE'
            });
        } else if (deleteType === 'team') {
            fetch('http://localhost:8000/teams/' + teamObj.TeamID, {
                method: 'DELETE'
            });
        } else if (deleteType === 'game') {
            fetch('http://localhost:8000/games/' + gameObj.GameID, {
                method: 'DELETE'
            });
        }
        // reload the page
        window.location.reload();
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
        const teamObj = teamList.find(team => team.TeamID === teamID);
        return teamObj.TeamName;
    }

    return (
        <div>
            <h1>Delete</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Delete Type:
                    <select value={deleteType} onChange={(e) => setDeleteType(e.target.value)}>
                        <option value="player">Player</option>
                        <option value="team">Team</option>
                        <option value="game">Game</option>
                    </select>
                </label>
                <br />
                {deleteType === 'player' && (
                    <label>
                        Player:
                        <select value={player.PlayerID} onChange={findPlayer}>
                            <option value="">Select a player</option>
                            {playerList.map(player => (
                                <option key={player.PlayerID} value={player.PlayerID}>{player.PlayerName}</option>
                            ))}
                        </select>
                    </label>
                )}
                {deleteType === 'team' && (
                    <label>
                        Team:
                        <select value={team.TeamID} onChange={findTeam}>
                            <option value="">Select a team</option>
                            {teamList.map(team => (
                                <option key={team.TeamID} value={team.TeamID}>{team.TeamName}</option>
                            ))}
                        </select>
                    </label>
                )}
                {deleteType === 'game' && (
                    <label>
                        Game:
                        <select value={game.GameID} onChange={findGame}>
                        <option value="">Select a game</option>
                            {gameList.map(game => (
                                <option key={game.GameID} value={game.GameID}>{game.GameID + '. ' + getTeamName(game.GameHomeTeamID) + ' vs. ' + getTeamName(game.GameAwayTeamID)}</option>
                            ))}
                        </select>
                    </label>
                )}
                <br />
                <input type="submit" value="Delete" />
            </form>
        </div>
    );
}

export default Delete;