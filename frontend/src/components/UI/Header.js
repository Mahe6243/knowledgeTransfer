import { Link } from 'react-router-dom';
import '../../global.css';

const Header = () => {
    return (
        <div className="header text-white">
            <ul className="navbar container bd-navbar-nav flex-row collapse show  nav-tabs "> 
        
                <li className="nav-item"><Link to='/' className='text-white nav-link'>Knowledge Transfer</Link></li>
                <li className="nav-item text-white nav-link" >Buy Books</li>
                <li className="nav-item text-white  nav-link ">Sell Books</li>
                <li className="nav-item text-white  nav-link ">Profile</li>
                {!localStorage.getItem('token') && <li className="nav-item nav-link"><Link to='/signup'className='text-white'>Signup</Link></li>}
                {!localStorage.getItem('token') && <li className="nav-item nav-link"><Link to='/signin'className='text-white'>Signin</Link></li>}
                {localStorage.getItem('token') &&< li className="nav-item nav-link"><Link to='/signout'className='text-white'>Signout</Link></li>}
            </ul>
        </div>
    );
}

export default Header;