import {useState, useEffect} from 'react';
import Table from './Table';

const Teams = () => {

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

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


    return (
        <div>
            <h1>Teams</h1>
            {!loading && <Table table={teams} />}
        </div>
    );
}

export default Teams;