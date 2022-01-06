import { Link } from 'react-router-dom';
import '../../global.css';

const Header = () => {
    const isAuthenticated = () => {
        return localStorage.getItem('token');
    }

    return (
        <div className="header">
            <ul className="navbar container">
                <li className="navbar-brand"><Link to='/'>Knowledge Transfer</Link></li>
                <li className="nav-item">Buy Books</li>
                <li className="nav-item"><Link to='/sellbooks'>Sell Books</Link></li>
                <li className="nav-item"><Link to='/profile'>Profile</Link></li>
                {!isAuthenticated() && <li className="nav-item"><Link to='/signup'>Signup</Link></li>}
                {!isAuthenticated() && <li className="nav-item"><Link to='/signin'>Signin</Link></li>}
                {isAuthenticated() && <li className="nav-item"><Link to='/signout'>Signout</Link></li>}
                {!isAuthenticated() && <li className="nav-item"><Link to='/cart'>Cart</Link></li>}
            </ul>
        </div>
    );
}

export default Header;