import Logo from '../assets/logoWhite.png';
import Logout from "../assets/logout.png";
import { UserContext } from '../UserContext/UserContext';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import "./Header.css";

export default function Header() {
    const { user, logout } = useContext(UserContext);

    return (
        <div className="sticky-top d-flex bg-dark justify-content-between align-items-center p-2">
            <Link to='/'>
                <img src={Logo} alt="ParkEasy" className="logo m-2" />
            </Link>
            {user ? (
                <div className='mx-3 d-flex align-items-center flex-wrap justify-content-center gap-2'>
                    <span className="text-white">{user.name}</span>
                    <button className='bg-dark logout-btn' onClick={logout}>
                        <img className='logoutImg' src={Logout} alt="Logout" />
                    </button>
                </div>
            ) : (
                <Link className="btn btn-outline-light mx-3" to="/login">Signin</Link>
            )}
        </div>
    )
}