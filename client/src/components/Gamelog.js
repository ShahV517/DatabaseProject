
import {useState , useEffect} from 'react';
import Table from './Table';

const Gamelogs = ({game, player}) => {

    const [gamelogs, setGamelogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getGamelogs = async () => {
            const gamelogsFromServer = await fetchGamelogs();
            setGamelogs(gamelogsFromServer);
            setLoading(false);
        }
        getGamelogs();
    }
    , []);