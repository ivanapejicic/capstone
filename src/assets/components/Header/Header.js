import './Header.scss';
import { Link } from 'react-router-dom';

function Header() {
    return(
        <div className='header'>
            <Link to='/'><p className='header__title'>WePool</p></Link>
            <div className='header__buttons'>
                <Link to='/'><p>Home</p></Link>
                <Link to='/about'><p>About</p></Link>
            </div>
        </div>
    );
}

export default Header;