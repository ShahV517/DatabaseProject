import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div>
                <h1>My Blog</h1>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/add">Add</Link>
                    <Link to="/players">Players</Link>
                    <Link to="/teams">Teams</Link>
                    <Link to="/games">Games</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;