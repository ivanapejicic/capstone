import './Trip.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import format from 'date-fns/format';
import UserProfileModal from '../UserProfileModal/UserProfileModal';
import userIcon from '../../icons/account_circle_FILL0_wght400_GRAD0_opsz24.svg';

function Trip({ users, user, trip }) {
    const associatedUser = users.find((u) => u.user_id === trip.user_id);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const openProfileModal = () => {
        setShowProfileModal(true);
    };

    const closeProfileModal = () => {
        setShowProfileModal(false);
    };

    const formatTime = (timeString) => {
        const parsedTime = new Date(`1970-01-01T${timeString}Z`);
        return format(parsedTime, 'HH:mm');
    };
    return (
        <div className='trip'>
            <div className='trip__info'>
                <p className='trip__info-time'>Leaving at: {formatTime(trip.departure_time)}</p>
                <p className='trip__info-location'>From: {trip.start_location}</p>
            </div>
            <div className='trip__info'>
                <p className='trip__info-time'>Returning at: {formatTime(trip.return_time)}</p>
                <p className='trip__info-location'>To: {trip.end_location}</p>
            </div>
            <div className='trip__profile'>
                <img src={userIcon} alt='icon for user profile'></img>
                {associatedUser && (
                    <>
                        <p>{`By: ${associatedUser.full_name}`}</p>
                        <Link to='#' onClick={openProfileModal} style={{ color: '#3498db',textDecoration: 'underline' }}>
                            Info
                        </Link>

                    </>

                )}
            </div>
            {showProfileModal && (
                <UserProfileModal user={associatedUser} onClose={closeProfileModal} />
            )}
        </div>
    );
}

export default Trip;