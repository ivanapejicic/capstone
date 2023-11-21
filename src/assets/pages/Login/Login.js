import './Login.scss';
import login from '../../icons/passkey_FILL0_wght400_GRAD0_opsz24.svg';
import arrowBack from '../../icons/arrow_back_FILL0_wght400_GRAD0_opsz24.svg';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Login() {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("http://localhost:8080/users/login", {
            email: event.target.username.value,
            password: event.target.password.value
        })
            .then((response) => {
                sessionStorage.setItem('token', response.data.token)
                navigate('/')
            })
    }
    return (
        <>
            <div className='login'>
                <form className='form' onSubmit={handleSubmit}>
                    <Link to='/user'><img className='form__arrow' src={arrowBack} alt='arrow back icon that takes user to home page'></img></Link>
                    <h1 className='login__title'>Welcome Back! <img src={login} alt="google icon for user login"></img></h1>
                    <label className='form__label' htmlFor="username">Username:</label>
                    <input className='form__input' type="text" id="username" name="username" required />
                    <br />
                    <label className='form__label' htmlFor="password">Password:</label>
                    <input className='form__input' type="password" id="password" name="password" required />
                    <br />
                    <div className='form__links'>
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="/forgot-password">Forgot password?</a>
                    </div>
                    <button className='form__button' type="submit">Login</button>
                    {error && <div className="login__message">{error}</div>}
                </form>
                <p>
                    Need an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </>
    );
}

export default Login;
