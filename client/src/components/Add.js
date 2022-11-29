import {useState, useEffect} from 'react';
import styles from './Add.module.css';
const Add = () => {
    // add player, team, game, or gameLog
    const [add, setAdd] = useState('player');
    // player: PlayerName, PlayerHeight, PlayerAge, PlayerWeight, PlayerWingspan, PlayerTeamID, PlayerPositionID, College, JerseyNumber, Country, InjuryStatus
    const [player, setPlayer] = useState({
        PlayerName: '',
        PlayerHeight: '',
        PlayerAge: '',
        PlayerWeight: '',
        PlayerWingspan: '',
        PlayerTeamID: '',
        PlayerPositionID: '',
        College: '',
        JerseyNumber: '',
        Country: '',
        InjuryStatus: ''
    });
    // team: TeamName, City, CoachName, NumberOfWins, NumberOfLosses
    const [team, setTeam] = useState({
        TeamName: '',
        City: '',
        CoachName: '',
        NumberOfWins: '',
        NumberOfLosses: ''
    });

    // game: GameDate, GameHomeTeamID, GameAwayTeamID, GameHomeTeamScore, GameAwayTeamScore
    const [game, setGame] = useState({
        GameDate: '',
        GameHomeTeamID: '',
        GameAwayTeamID: '',
        GameHomeTeamScore: '',
        GameAwayTeamScore: ''
    });

    // gameLog: GameID, PlayerID, MinutesPlayed, Points, Rebounds, Assists, Steals, Blocks, Turnovers, Fouls, SeasonYear
    const [gameLog, setGameLog] = useState({
        GameID: '',
        PlayerID: '',
        MinutesPlayed: '',
        Points: '',
        Rebounds: '',
        Assists: '',
        Steals: '',
        Blocks: '',
        Turnovers: '',
        Fouls: '',
        SeasonYear: ''
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        if (add === 'player') {
            await fetch('http://localhost:8000/players', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(player)
            });
        } else if (add === 'team') {
            await fetch('http://localhost:8000/teams', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(team)
            });
        } else if (add === 'game') {
            await fetch('http://localhost:8000/games', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(game)
            });
        } else if (add === 'gameLog') {
            await fetch('http://localhost:8000/gameLogs', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(gameLog)
            });
        }
    }

    const addData = (e) => {
        setAdd(e.target.value);
    }

    return (
        <div className={styles.add}>
            <h1>Add</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Add: </label>
                    <select value={add} onChange={(e) => setAdd(e.target.value)}>
                        <option value="player">Player</option>
                        <option value="team">Team</option>
                        <option value="game">Game</option>
                        <option value="gameLog">Game Log</option>
                    </select>
                </div>
                {add === 'player' && (
                    <div>
                        <label>Player Name: </label>
                        <input type="text" value={player.PlayerName} onChange={(e) => setPlayer({ ...player, PlayerName: e.target.value })} />
                        <label>Player Height: </label>
                        <input type="text" value={player.PlayerHeight} onChange={(e) => setPlayer({ ...player, PlayerHeight: e.target.value })} />
                        <label>Player Age: </label>
                        <input type="text" value={player.PlayerAge} onChange={(e) => setPlayer({ ...player, PlayerAge: e.target.value })} />
                        <label>Player Weight: </label>
                        <input type="text" value={player.PlayerWeight} onChange={(e) => setPlayer({ ...player, PlayerWeight: e.target.value })} />
                        <label>Player Wingspan: </label>
                        <input type="text" value={player.PlayerWingspan} onChange={(e) => setPlayer({ ...player, PlayerWingspan: e.target.value })} />
                        <label>Player Team ID: </label>
                        <input type="text" value={player.PlayerTeamID} onChange={(e) => setPlayer({ ...player, PlayerTeamID: e.target.value })} />
                        <label>Player Position ID: </label>
                        <input type="text" value={player.PlayerPositionID} onChange={(e) => setPlayer({ ...player, PlayerPositionID: e.target.value })} />
                        <label>College: </label>
                        <input type="text" value={player.College} onChange={(e) => setPlayer({ ...player, College: e.target.value })} />
                        <label>Jersey Number: </label>
                        <input type="text" value={player.JerseyNumber} onChange={(e) => setPlayer({ ...player, JerseyNumber: e.target.value })} />
                        <label>Country: </label>
                        <input type="text" value={player.Country} onChange={(e) => setPlayer({ ...player, Country: e.target.value })} />
                        <label>Injury Status: </label>
                        <input type="text" value={player.InjuryStatus} onChange={(e) => setPlayer({ ...player, InjuryStatus: e.target.value })} />
                    </div>
                )}
                {add === 'team' && (
                    <div>
                        <label>Team Name: </label>
                        <input type="text" value={team.TeamName} onChange={(e) => setTeam({ ...team, TeamName: e.target.value })} />
                        <label>City: </label>
                        <input type="text" value={team.City} onChange={(e) => setTeam({ ...team, City: e.target.value })} />
                        <label>Coach Name: </label>
                        <input type="text" value={team.CoachName} onChange={(e) => setTeam({ ...team, CoachName: e.target.value })} />
                        <label>Number of Wins: </label>
                        <input type="text" value={team.NumberOfWins} onChange={(e) => setTeam({ ...team, NumberOfWins: e.target.value })} />
                        <label>Number of Losses: </label>
                        <input type="text" value={team.NumberOfLosses} onChange={(e) => setTeam({ ...team, NumberOfLosses: e.target.value })} />
                    </div>
                )}
                {add === 'game' && (
                    <div>
                        <label>Game Date: </label>
                        <input type="text" value={game.GameDate} onChange={(e) => setGame({ ...game, GameDate: e.target.value })} />
                        <label>Game Home Team ID: </label>
                        <input type="text" value={game.GameHomeTeamID} onChange={(e) => setGame({ ...game, GameHomeTeamID: e.target.value })} />
                        <label>Game Away Team ID: </label>
                        <input type="text" value={game.GameAwayTeamID} onChange={(e) => setGame({ ...game, GameAwayTeamID: e.target.value })} />
                        <label>Game Home Team Score: </label>
                        <input type="text" value={game.GameHomeTeamScore} onChange={(e) => setGame({ ...game, GameHomeTeamScore: e.target.value })} />
                        <label>Game Away Team Score: </label>
                        <input type="text" value={game.GameAwayTeamScore} onChange={(e) => setGame({ ...game, GameAwayTeamScore: e.target.value })} />
                    </div>
                )}
                {add === 'gameLog' && (
                    //gameLog: GameID, PlayerID, MinutesPlayed, Points, Rebounds, Assists, Steals, Blocks, Turnovers, Fouls, SeasonYear
                    <div>
                        <label>Game ID: </label>
                        <input type="text" value={gameLog.GameID} onChange={(e) => setGameLog({ ...gameLog, GameID: e.target.value })} />
                        <label>Player ID: </label>
                        <input type="text" value={gameLog.PlayerID} onChange={(e) => setGameLog({ ...gameLog, PlayerID: e.target.value })} />
                        <label>Minutes Played: </label>
                        <input type="text" value={gameLog.MinutesPlayed} onChange={(e) => setGameLog({ ...gameLog, MinutesPlayed: e.target.value })} />
                        <label>Points: </label>
                        <input type="text" value={gameLog.Points} onChange={(e) => setGameLog({ ...gameLog, Points: e.target.value })} />
                        <label>Rebounds: </label>
                        <input type="text" value={gameLog.Rebounds} onChange={(e) => setGameLog({ ...gameLog, Rebounds: e.target.value })} />
                        <label>Assists: </label>
                        <input type="text" value={gameLog.Assists} onChange={(e) => setGameLog({ ...gameLog, Assists: e.target.value })} />
                        <label>Steals: </label>
                        <input type="text" value={gameLog.Steals} onChange={(e) => setGameLog({ ...gameLog, Steals: e.target.value })} />
                        <label>Blocks: </label>
                        <input type="text" value={gameLog.Blocks} onChange={(e) => setGameLog({ ...gameLog, Blocks: e.target.value })} />
                        <label>Turnovers: </label>
                        <input type="text" value={gameLog.Turnovers} onChange={(e) => setGameLog({ ...gameLog, Turnovers: e.target.value })} />
                        <label>Fouls: </label>
                        <input type="text" value={gameLog.Fouls} onChange={(e) => setGameLog({ ...gameLog, Fouls: e.target.value })} />
                        <label>Season Year: </label>
                        <input type="text" value={gameLog.SeasonYear} onChange={(e) => setGameLog({ ...gameLog, SeasonYear: e.target.value })} />
                    </div>
                )}
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Add;