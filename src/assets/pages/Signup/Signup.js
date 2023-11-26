import './Signup.scss';
import { Link } from 'react-router-dom';
import arrowBack from '../../icons/arrow_back_FILL0_wght400_GRAD0_opsz24.svg';
import { useState } from 'react';
import axios from 'axios';
import API_URL from '../../../utils';

function Signup() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${API_URL}/users/register`, {
            username: event.target.username.value,
            password: event.target.password.value,
            full_name: event.target.fullName.value,
            email: event.target.email.value,
            phone_number: event.target.phoneNumber.value,
            mini_bio: event.target.miniBio.value
        })

            .then(() => {
                setSuccess(true);
                setError("");
                event.target.reset();
            })
            .catch((error) => {
                setSuccess(false);
                setError(error.response.data);
            });
    };

    return (
        <div className='signup'>
            <form className='form' onSubmit={handleSubmit}>
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
                <label className='form__label' htmlFor="fullName">Full Name:</label>
                <input className='form__input' type="text" id="fullName" name="fullName" required />
                <br />
                <label className='form__label' htmlFor="miniBio">Mini Bio:</label>
                <textarea className='form__textarea' id="miniBio" name="miniBio" rows="4" required></textarea>
                <br />
                <label className='form__label' htmlFor="phoneNumber">Phone Number:</label>
                <input className='form__input' type="tel" id="phoneNumber" name="phoneNumber" required />
                <br />
                <button className='form__button' type="submit">Sign Up</button>
                {success && (
                    <div className="signup__message">
                        Signed up! <Link to="/login">Go to Login</Link>
                    </div>
                )}
                {error && <div className="signup__message">{error}</div>}
            </form>
        </div>
    );
}

export default Signup;
