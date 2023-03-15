import {useState, useEffect} from 'react';
import Table from './Table';

const Teams = () => {

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nameInput, setnameInput] = useState('');
    const [cityInput, setcityInput] = useState('');
    const [coachInput, setcoachInput] = useState('');
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const getTeams = async () => {
            const teamsFromServer = await fetchTeams();
            setTeams(teamsFromServer);
            setLoading(false);
        }
        getTeams();
    }
    , []);

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

    const handleNameInput = (e) => {
        setnameInput(e.target.value);
    }

    const handleCityInput = (e) => {
        setcityInput(e.target.value);
    }

    const handleCoachInput = (e) => {
        setcoachInput(e.target.value);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        const filteredTeams = teams.filter(team => team.TeamName.toLowerCase().includes(nameInput.toLowerCase()) && team.City.toLowerCase().includes(cityInput.toLowerCase()) && team.CoachName.toLowerCase().includes(coachInput.toLowerCase()));
        setFilteredTeams(filteredTeams);
        setSubmitted(true);
    }

    return (
        <div>
            <h1>Teams</h1>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search for a team" value={nameInput} onChange={handleNameInput} />
                <input type="text" placeholder="Search for a city" value={cityInput} onChange={handleCityInput} />
                <input type="text" placeholder="Search for a coach" value={coachInput} onChange={handleCoachInput} />
                <input type="submit" value="Search" />
            </form>
            {loading ? <h3>loading...</h3> :
            (filteredTeams.length > 0 ? <Table table={filteredTeams} /> : 
            submitted ? <h3>No teams found</h3> : <Table table={teams} />)
            }
        </div>
    );
}

export default Teams;