import './User.scss';

function User() {
    return(
        <div className='user'>
            <div className='user__top'>
                <h1 className='user__top-title'>Ready to dive in?</h1>
                <h2 className='user__top-subtitle'>Sign up for the fun ride</h2>
                <button className='user__top-button'>SIGN UP</button>
            </div>
            <div className='user__bottom'>
                <h1 className='user__bottom-title'>Already on board?</h1>
                <h2 className='user__bottom-subtitle'>Log in to your account</h2>
                <button className='user__bottom-title'>LOG IN</button>
            </div>
        </div>
    );
}

export default User;