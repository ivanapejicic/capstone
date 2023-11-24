import './UserProfileModal.scss';

function UserProfileModal({ user, onClose }) {
    const handleClose = () => {
        onClose();
    };
    return (
        <div className="user-profile-modal">
            <h3 className="user__title">Contact info for {user.full_name}</h3>
            <p className="user__info">Email: {user.email}</p>
            <p className="user__info">username: {user.username}</p>
            <p className="user__info">Phone number: {user.phone_number}</p>
            <p className='user__about'>About: {user.mini_bio}</p>
            <button className="user__button" onClick={handleClose}>Close</button>
        </div>
    );
}

export default UserProfileModal;
