import {useState, useEffect} from 'react';
import Table from './Table';

const Query = () => {
    const [players, setPlayers] = useState([]);
    const [playersLoading, setPlayersLoading] = useState(true);
    const [player, setPlayer] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [season1, setSeason1] = useState('');
    const [season2, setSeason2] = useState('');
    const [season3, setSeason3] = useState('');
    const [season4, setSeason4] = useState('');
    const [stat1, setStat1] = useState('');
    const [stat2, setStat2] = useState('');
    const [stat3, setStat3] = useState('');
    const [query1, setQuery1] = useState([]);
    const [query1Loading, setQuery1Loading] = useState(true);
    const [teams, setTeams] = useState([]);
    const [teamsLoading, setTeamsLoading] = useState(true);
    const [highestOrLowest, setHighestOrLowest] = useState('');
    const [query2, setQuery2] = useState([]);
    const [query2Loading, setQuery2Loading] = useState(true);
    const [n, setN] = useState('');
    const [n2, setN2] = useState('');
    const [topOrBottom, setTopOrBottom] = useState('');
    const [query3, setQuery3] = useState([]);
    const [query3Loading, setQuery3Loading] = useState(true);
    const [query4, setQuery4] = useState([]);
    const [query4Loading, setQuery4Loading] = useState(true);

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

    const fetchQuery1 = async () => {
        try {
            let queries = [];
            for (let i = 0; i < filteredPlayers.length; i++) {
                const res = await fetch(`http://localhost:8000/query1/${filteredPlayers[i].PlayerID}/${season1}/${stat1}`, {
                    method: 'GET'
                    });
                // check for 400 error
                if (res.status === 400) {
                    alert('Invalid stat');
                    return;
                }
                const data = await res.json();
                if (data[0].PlayerName !== null) {
                    queries.push(data[0]);
                }
            }
            setQuery1(queries);
            setQuery1Loading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchQuery2 = async () => {
        try {
            console.log(highestOrLowest);
            console.log(season2);
            console.log(stat2);
            const res = await fetch(`http://localhost:8000/query2/${season2}/${stat2}/${highestOrLowest}`, {
                method: 'GET'
                });
            // check for 400 error
            if (res.status === 400) {
                alert('Invalid stat');
                return;
            }
            const data = await res.json();
            console.log(data);
            setQuery2(data);
            setQuery2Loading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchQuery3 = async () => {
        try {
            const res = await fetch(`http://localhost:8000/query3/${season3}/${stat3}/${n}/${topOrBottom}`, {
                method: 'GET'
                });
            // check for 400 error
            if (res.status === 400) {
                alert('Invalid stat');
                return;
            }
            const data = await res.json();
            console.log(data);
            setQuery3(data);
            setQuery3Loading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchQuery4 = async () => {
        try {
            const res = await fetch(`http://localhost:8000/query4/${season4}/${n2}`, {
                method: 'GET'
                });
            // check for 400 error
            if (res.status === 400) {
                alert('Did not work');
                return;
            }
            const data = await res.json();
            console.log(data);
            setQuery4(data);
            setQuery4Loading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handlePlayer = (e) => {
        setPlayer(e.target.value);
        setFilteredPlayers(players.filter(Player => Player.PlayerName.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    const handleSeason1Input = (e) => {
        setSeason1(e.target.value);
    }

    const handleSeason2Input = (e) => {
        setSeason2(e.target.value);
    }

    const handleSeason3Input = (e) => {
        setSeason3(e.target.value);
    }

    const handleSeason4Input = (e) => {
        setSeason4(e.target.value);
    }

    const handleStat1Input = (e) => {
        setStat1(e.target.value);
    }

    const handleStat2Input = (e) => {
        setStat2(e.target.value);
    }

    const handleStat3Input = (e) => {
        setStat3(e.target.value);
    }

    const handleHighestOrLowest = (e) => {
        setHighestOrLowest(e.target.value);
    }

    const handleN = (e) => {
        setN(e.target.value);
    }

    const handleN2 = (e) => {
        setN2(e.target.value);
    }


    const handleTopOrBottom = (e) => {
        setTopOrBottom(e.target.value);
    }

    const handleSearch1 = async (e) => {
        e.preventDefault();
        fetchQuery1();
        clearSearch1();
    }

    const handleSearch2 = async (e) => {
        e.preventDefault();
        fetchQuery2();
        clearSearch2();
    }

    const handleSearch3 = async (e) => {
        e.preventDefault();
        fetchQuery3();
        clearSearch3();
    }

    const handleSearch4 = async (e) => {
        e.preventDefault();
        fetchQuery4();
        clearSearch4();
    }

    const clearSearch1 = () => {
        setPlayer('');
        setSeason1('');
        setStat1('');
        setFilteredPlayers([]);
    }

    const clearSearch2 = () => {
        setSeason2('');
        setStat2('');
        // uncheck radio buttons
        document.getElementById('highest').checked = false;
        document.getElementById('lowest').checked = false;
        setHighestOrLowest('');
    }

    const clearSearch3 = () => {
        setSeason3('');
        setStat3('');
        setN('');
        // uncheck radio buttons
        document.getElementById('top').checked = false;
        document.getElementById('bottom').checked = false;
        setTopOrBottom('');
    }

    const clearSearch4 = () => {
        setSeason4('');
        setN2('');
    }

    return (
        <div>
            <h1>Queries</h1>
            <h4>
                Query 1: Get a player's specific average stat for a given season (points, rebounds, assists, steals, blocks, turnovers, fouls)
            </h4>
            <form onSubmit={handleSearch1}>
                <input type="text" placeholder="Search for a player" value={player} onChange={handlePlayer} />
                <input type="text" placeholder="Season" value={season1} onChange={handleSeason1Input} />
                <input type="text" placeholder="Stat" value={stat1} onChange={handleStat1Input} />
                <input type="submit" value="Search" />
            </form>
            {playersLoading ? <h3>loading...</h3> :
            (query1Loading ? null : 
            (query1.length > 0 ? <Table table={query1} /> : <h3>No results found</h3>))
            }
            <h4>
                Query 2: Which team has the (highest/lowest) average stat (height, weight, points, rebounds, assists, steals, blocks, turnovers, fouls) for a given season?
            </h4>
            <form onSubmit={handleSearch2}>
                <input type="text" placeholder="Season" value={season2} onChange={handleSeason2Input} />
                <input type="text" placeholder="Stat" value={stat2} onChange={handleStat2Input} />
                <input type="radio" id="highest" name="highestOrLowest" value="highest" onChange={handleHighestOrLowest} />
                <label for="highest">Highest</label>
                <input type="radio" id="lowest" name="highestOrLowest" value="lowest" onChange={handleHighestOrLowest} />
                <label for="lowest">Lowest</label>
                <input type="submit" value="Search" />
            </form>
            {teamsLoading ? <h3>loading...</h3> :
            (query2Loading ? null :
            (query2.length > 0 ? <Table table={query2} /> : <h3>No results found</h3>))
            }
            <h4>
                Query 3: Which (n) players have the (top/bottom) average stat (height, weight, points, rebounds, assists, steals, blocks, turnovers, fouls) for a given season?
            </h4>
            <form onSubmit={handleSearch3}>
                <input type="text" placeholder="Season" value={season3} onChange={handleSeason3Input} />
                <input type="text" placeholder="Stat" value={stat3} onChange={handleStat3Input} />
                <input type="text" placeholder="N" value={n} onChange={handleN} />
                <input type="radio" id="top" name="topOrBottom" value="top" onChange={handleTopOrBottom} />
                <label for="top">Top</label>
                <input type="radio" id="bottom" name="topOrBottom" value="bottom" onChange={handleTopOrBottom} />
                <label for="bottom">Bottom</label>
                <input type="submit" value="Search" />
            </form>
            {teamsLoading ? <h3>loading...</h3> :
            (query3Loading ? null :
            (query3.length > 0 ? <Table table={query3} /> : <h3>No results found</h3>))
            }
            <h4>
                Query 4: Which n referees have officiated the most games in a given season?
            </h4>
            <form onSubmit={handleSearch4}>
                <input type="text" placeholder="Season" value={season4} onChange={handleSeason4Input} />
                <input type="text" placeholder="N" value={n2} onChange={handleN2} />
                <input type="submit" value="Search" />
            </form>
            {query4Loading ? null :
            (query4.length > 0 ? <Table table={query4} /> : <h3>No results found</h3>)
            }
        </div>
    )
}

export default Query