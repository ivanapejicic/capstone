import './Login.scss';
import login from '../../icons/passkey_FILL0_wght400_GRAD0_opsz24.svg';

function Login() {
    return (
        <>

            <div className='login'>
                <form className='form'>
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
                    <button className='form__button' type="button">Login</button>
                </form>
            </div>
        </>
    );
}

export default Login;
