import Header from '../../components/Header/Header';
import './User.scss';
import car from '../../images/home.jpeg'


function User() {
    return(
        <div className='user'>
            <Header />
            <img className='user__photo' src={car} alt='same car that was on a home page, with luggage on top, in tropical area'></img>
            <div className='user__content'>
            <div className='user__content-box'>
                <h1 className='user__content-box__title'>Ready to dive in?</h1>
                <h2 className='user__content-box__subtitle'>Sign up for the fun ride</h2>
                <button className='user__content-box__button'>SIGN UP</button>
            </div>
            <div className='user__content-box'>
                <h1 className='user__content-box__title'>Already on board?</h1>
                <h2 className='user__content-box__subtitle'>Log in to your account</h2>
                <button className='user__content-box__button'>LOG IN</button>
            </div>
            </div>
        </div>
    );
}

export default User;