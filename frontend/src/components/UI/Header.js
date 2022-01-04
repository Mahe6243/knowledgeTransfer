import { Link } from 'react-router-dom';
import '../../global.css';

const Header = () => {
    return (
        <div className="header">
            <ul className="navbar container">
                <li className="navbar-brand"><Link to='/'>Knowledge Transfer</Link></li>
                <li className="nav-item">Buy Books</li>
                <li className="nav-item">Sell Books</li>
                <li className="nav-item">Profile</li>
                {!localStorage.getItem('token') && <li className="nav-item"><Link to='/signup'>Signup</Link></li>}
                {!localStorage.getItem('token') && <li className="nav-item"><Link to='/signin'>Signin</Link></li>}
                <li className="nav-item"><Link to='/signout'>Signout</Link></li>
            </ul>
        </div>
    );
}

export default Header;