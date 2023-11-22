import './HeaderProfile.scss';
import { Link } from 'react-router-dom';

function HeaderProfile() {
    return(
        <div className='header'>
            <Link to='/rides'><p className='header__title'>WePool</p></Link>
            <div className='header__buttons'>
                <Link to='/rides'><p>Rides</p></Link>
                <Link to='/profile'><p>Profile</p></Link>
            </div>
        </div>
    );
}

export default HeaderProfile;