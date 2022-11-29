import {useState, useEffect} from 'react';
import Table from './Table';

const Home = () => {
    // display all tables in the database
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const getTables = async () => {
            const tablesFromServer = await fetchTables();
            setTables(tablesFromServer);
            setLoading(false);
        }
        getTables();
    }, []);

    const fetchTables = async () => {
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

    console.log("tables: ", tables);

    return (
        <div>
            <h1>Home</h1>
            <h2>Tables</h2>
            {!loading && <Table table={tables} />}
        </div>
    );
}

export default Home;