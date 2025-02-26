import Logo from '../assets/logoWhite.png';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="sticky-top d-flex bg-dark justify-content-between align-items-center p-2">
            <Link to='/'>
                <img src={Logo} alt="ParkEasy" className="m-2" width='200px' />
            </Link>
            <Link to='/login'>
                <button type="button" class="btn btn-outline-light mx-4">Login</button>
            </Link>
        </div>
    )
}