import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Profile.scss';
import format from 'date-fns/format';
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import logo from '../../icons/account_circle_FILL0_wght400_GRAD0_opsz24.svg';
import edit from '../../icons/edit_FILL0_wght400_GRAD0_opsz24.svg';
import del from '../../icons/delete_FILL0_wght400_GRAD0_opsz24.svg';

function Profile() {
    const navigate = useNavigate()

    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [user, setUser] = useState(null);
    const [failedAuth, setFailedAuth] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [trips, setTrips] = useState([]);

    const formatTime = (timeString) => {
        const parsedTime = new Date(`1970-01-01T${timeString}Z`);
        return format(parsedTime, 'HH:mm');
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token')

        if (!token) {
            return setFailedAuth(true)
        }

        axios
            .get("http://localhost:8080/users/current", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setUser(response.data)
                setId(response.data.user_id)
            })
            .catch((error) => {
                console.log(error);
                setFailedAuth(true)
            })
    }, [id]);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }

    const handleBioChange = (event) => {
        setBio(event.target.value);
    }

    const handleSave = async () => {
        try {
            const updatedData = {
                full_name: name || user.full_name,
                email: email || user.email,
                phone_number: phone || user.phone_number,
                username: username || user.username,
                mini_bio: bio || user.mini_bio,
            };

            const response = await axios.put(`http://localhost:8080/users/${id}`, updatedData);

            setUser(response.data);
            setEditMode(false);
            setTimeout(() => {
                window.location.href = `/profile/${id}`;
            }, 500);
        } catch (error) {
            console.error(error);
        }
    };


    const enterEditMode = () => {
        setEditMode(true);
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
        const year = date.getFullYear();
        return `${month}, ${year}`;
    };

    const handleDeleteConfirmation = async () => {
        try {
            await axios.delete(`http://localhost:8080/users/${id}`);
            navigate('/');
            alert("Sorry to see you go!");
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    };
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        setUser(null);
        setFailedAuth(true);
        alert("Logout Successful! 👋🔒");

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/trips");
                setTrips(response.data);
            } catch (error) {
                console.error('Error fetching trips data:', error);
            }
        };

        fetchData();
    }, []);

    const myTrips = trips.filter((trip) => {
        return trip.user_id === id;
    });
    const handleDeleteTrips = (id) => {

        const deleteTrip = async () => {
            try {
                const response = await axios.delete(`http://localhost:8080/trips/${id}`);
                const updatedTrips = trips.filter((trip) => trip.trip_id !== id);
                setTrips(updatedTrips);
            } catch (error) {
                console.error(error);
            }
        }
        deleteTrip();
    }

    return (
        <>
            <HeaderProfile />
            {user && (
                <div className="info">
                    <div className="info__left">
                        <p className="info__left-text">{user.full_name}</p>
                        <p className="info__left-text">
                            Member since: {user.registration_date ? formatDate(user.registration_date) : 'N/A'}
                        </p>
                    </div>
                    <div className="info__right">
                        <img
                            className="info__right-icon"
                            src={logo}
                            alt="user icon to show that this is user's profile"
                        />
                    </div>
                </div>
            )}
            {!editMode && user && (
                <div className="info">
                    <div className="info__left">
                        <p className="info__left-text">{user.email}</p>
                        <p className="info__left-text">{user.phone_number}</p>
                    </div>
                    <div className="info__right">
                        <img
                            src={edit}
                            alt="icon showing a pen and giving an option of edit"
                            onClick={enterEditMode}
                        />
                    </div>
                </div>
            )}{!editMode && user && (
                <div className="info">
                    <p className="info__left-text">{user.mini_bio}</p>
                </div>
            )}
            {editMode && user && (
                <div className="update">
                    <h2 className="update__title">Edit your info here: </h2>
                    <form className="form">
                        <div className="update-form__group">
                            <label className="update__label" htmlFor="email">
                                Update email:
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    className="form__input"
                                    onChange={handleEmailChange}
                                    value={email}
                                />
                            </label>
                        </div>
                        <div className="update-form__group">
                            <label className="update__label" htmlFor="phone">
                                Update phone number:
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    className="form__input"
                                    onChange={handlePhoneChange}
                                    value={phone}
                                />
                            </label>
                        </div>
                        <div className="update-form__group">
                            <label className="update__label" htmlFor="username">
                                Update username:
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="form__input"
                                    onChange={handleUsernameChange}
                                    value={username}
                                />
                            </label>
                        </div>
                        <div className="update-form__group">
                            <label className="update__label" htmlFor="bio">
                                Update your mini-bio:
                                <textarea
                                    type="text"
                                    id="bio"
                                    name="bio"
                                    className="form__textarea"
                                    onChange={handleBioChange}
                                    value={bio}
                                />
                            </label>
                        </div>
                        <div className="form__actions">
                            <Link to="/profile/${id}" className="update-form__cancel">
                                <button
                                    type="button"
                                    className="form__button form__button--cancel"
                                    onClick={() => {
                                        setEditMode(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            </Link>
                            <button
                                className="form__button"
                                type="button"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {myTrips.length === 0 && (
                <div className="no-offered-trips">
                    <p>You didn't offer any trips yet. <Link to='/rides'>Offer here</Link></p>
                </div>
            )}
            {myTrips.length > 0 && (
                <div className='my-trips'>
                    <h3 className='my-trips__title'>Your Trips:</h3>
                    <ul className='my-trips__container'>
                        {myTrips.map((trip) => (
                            <li className='my-trips__container-item' key={trip.trip_id}>
                                From: {trip.start_location} at {formatTime(trip.departure_time)} - {trip.end_location} at {formatTime(trip.return_time)}
                                <div onClick={() => { handleDeleteTrips(trip.trip_id) }} style={{ cursor: 'pointer' }}>
                                    <img
                                        className="delete-icon"
                                        src={del}
                                        alt="icon of a trash can for user to click and delte specific trip"
                                    />
                                </div>
                                <Link to={`/update-trip/${trip.trip_id}`}>
                                    <img
                                        src={edit}
                                        alt="icon showing a pen and giving an option of edit"
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="button_container">
                <button className='delete_button' onClick={() => setShowDeleteConfirmation(true)}>Delete Profile</button>
                <Link to='/login'><button className="logout" onClick={handleLogout}>Log Out</button></Link>
            </div>

            {showDeleteConfirmation && (
                <div className="delete-confirmation">
                    <p>Are you sure you want to delete your profile?</p>
                    <div>
                        <button className='delete_button' onClick={handleDeleteConfirmation}>Yes</button>
                        <button className='delete_button' onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            )}
        </>
    );


}

export default Profile;

