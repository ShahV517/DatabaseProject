import {Link} from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav>
            <div>
                <h1 className={styles.h1}>BasketballUnited</h1>
                <br />
                <div className={styles.links}>
                    <Link to="/" className={styles.link}>Home</Link>
                    <Link to="/add" className={styles.link}>Add</Link>
                    <Link to="/players" className={styles.link}>Players</Link>
                    <Link to="/teams" className={styles.link}>Teams</Link>
                    <Link to="/games" className={styles.link}>Games</Link>
                    <Link to="/gamelog" className={styles.link}>Gamelog</Link>
                    <Link to="/update" className={styles.link}>Update</Link>
                    <Link to="/delete" className={styles.link}>Delete</Link>
                    <Link to="/query" className={styles.link}>Query</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;