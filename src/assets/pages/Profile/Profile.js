import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './Profile.scss';
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import logo from '../../icons/account_circle_FILL0_wght400_GRAD0_opsz24.svg';
import edit from '../../icons/edit_FILL0_wght400_GRAD0_opsz24.svg';

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

    const handleNameChange = (event) => {
        setName(event.target.value);
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
                            alt="user icon used as an image replacement"
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
            <div>
                <button onClick={() => setShowDeleteConfirmation(true)}>Delete Profile</button>
            </div>

            {showDeleteConfirmation && (
                <div className="delete-confirmation">
                    <p>Are you sure you want to delete your profile?</p>
                    <div>
                        <button onClick={handleDeleteConfirmation}>Yes</button>
                        <button onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            )}
        </>
    );


}

export default Profile;

