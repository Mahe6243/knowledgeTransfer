import { Link } from 'react-router-dom';
import '../../global.css';

const Header = () => {
    return (
        <div className="header">
            <ul className="navbar container">
                <li className="navbar-brand"><Link to='/'>Knowledge Transfer</Link></li>
                <li className="nav-item"><Link to='/'>Home</Link></li>
                <li className="nav-item">Books</li>
                <li className="nav-item">Profile</li>
                <li className="nav-item"><Link to='/signup'>Signup</Link></li>
                <li className="nav-item">Signin</li>
                <li className="nav-item">Signout</li>
            </ul>
        </div>
    );
}

export default Header;