import './UserProfileModal.scss'

function UserProfileModal({ user }) {
    return (
        <div className="user-profile-modal">
            <h2>User Profile</h2>
            <p>Email: {user.email}</p>
            <p>username: {user.username}</p>
            <p>Phone number: {user.phone_number}</p>
            <p className='about'>About: {user.mini_bio}</p>
            <button>Close</button>
        </div>
    );
}

export default UserProfileModal;
