import Header from '../Header/Header';
import './About.scss';
import about from '../../images/about.png';

function About() {
    return(
        <>
        <Header />
        <div className='about'>
            <h1 className='about__title'>Our Story</h1>
            <p className='about__one'>WePool is a versatile web app designed to connect people traveling in the same direction for various purposes, including work, school, trips, and more. It facilitates ride-sharing and assists users in finding others with similar travel routes, helping them save on transportation costs and reduce commute times, all while promoting eco-friendly transportation solutions.</p>
            <img className='about__image' src={about} alt='people driving together in a car'></img>
            <p className='about__two'>WePool's user base will be diverse and could include individuals traveling for work, school, leisure, or any other purpose. Users can sign up, input their travel routes and schedules, and search for others with similar itineraries. Special considerations for the app would involve ensuring user privacy, safety, and convenience, as mentioned previously, while accommodating a variety of trip types and preferences. The app should offer features to help users coordinate and share rides for a wide range of travel purposes.</p>
        </div>
        </>
    );
}

export default About;