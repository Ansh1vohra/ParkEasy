import Logo from '../assets/logoWhite.png';
import { UserContext } from '../UserContext/UserContext';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

export default function Header() {
    const { user, logout } = useContext(UserContext);

    return (
        <div className="sticky-top d-flex bg-dark justify-content-between align-items-center p-2">
            <Link to='/'>
                <img src={Logo} alt="ParkEasy" className="m-2" width='200px' />
            </Link>
            {user ? (
                <div className='mx-3 d-flex align-items-center flex-wrap justify-content-center gap-2'>
                    <span className="text-white">Hello, {user.name}</span>
                    <button className="btn btn-danger" onClick={logout}>Logout</button>
                </div>
            ) : (
                <Link className="btn btn-outline-light mx-3" to="/login">Signin</Link>
            )}
        </div>
    )
}