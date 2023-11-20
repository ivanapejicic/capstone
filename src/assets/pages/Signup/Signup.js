import './Signup.scss';
import { Link } from 'react-router-dom';
import arrowBack from '../../icons/arrow_back_FILL0_wght400_GRAD0_opsz24.svg';

function Signup() {
    return (
        <div className='signup'>
            <form className='form'>
                <Link to='/user'><img className='form__arrow' src={arrowBack} alt='arrow back icon that takes user to home page'></img></Link>
                <h1 className='signup__title'>Create an Account</h1>
                <label className='form__label' htmlFor="username">Username:</label>
                <input className='form__input' type="text" id="username" name="username" required />
                <br />
                <label className='form__label' htmlFor="email">Email:</label>
                <input className='form__input' type="email" id="email" name="email" required />
                <br />
                <label className='form__label' htmlFor="password">Password:</label>
                <input className='form__input' type="password" id="password" name="password" required />
                <br />
                <label className='form__label' htmlFor="confirmPassword">Confirm Password:</label>
                <input className='form__input' type="password" id="confirmPassword" name="confirmPassword" required />
                <br />
                <label className='form__label' htmlFor="miniBio">Mini Bio:</label>
                <textarea className='form__textarea' id="miniBio" name="miniBio" rows="4"></textarea>
                <br />
                <label className='form__label' htmlFor="phoneNumber">Phone Number:</label>
                <input className='form__input' type="tel" id="phoneNumber" name="phoneNumber" />
                <br />
                <button className='form__button' type="button">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
