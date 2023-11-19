import './Home.scss';
import homephoto from '../../images/home.jpeg';
import arrow from '../../icons/arrow_forward.svg';

function Home () {
    return(
        <div className='home'>
            <img  className='home__photo' src={homephoto} alt='car with luggage on top in tropical city with palms around'></img>
            <h1 className='home__title'>Your go-to for shared rides</h1>
            <h3 className='home__subtitle'>Save money, connect with travelers and go green</h3>
            <img className='home__arrow' src={arrow} alt='lttle arrow forward to click for next page'></img>
        </div>
    );
}

export default Home;