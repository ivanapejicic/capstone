import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './Profile.scss'

function Profile() {
    const navigate = useNavigate()

    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('');
    // const [name, setName] = useState('');
    // const [bio, setBio] = useState('');

    const [user, setUser] = useState(null);
	const [failedAuth, setFailedAuth] = useState(false);

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
			})}, [id]);
                // setUsername(response.data[0].username);
                // setEmail(response.data[0].email);
                // setPhone(response.data[0].phone_number);
                // setName(response.data[0].full_name);
                // setBio(response.data[0].mini_bio);

    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     fetchUser();
    // }, [id]);
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    // const handlePhoneChange = (event) => {
    //     setPhone(event.target.value);
    // }
    // const handleNameChange = (event) => {
    //     setName(event.target.value);
    // }
    // const handleBioChange = (event) => {
    //     setBio(event.target.value);
    // }

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8080/users/${id}`, {
                username,
                email
            });
            navigate('/rides');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="update">
            <form className="update-form">
                <div className="update-form__group">
                    <label className="update__label" htmlFor="full-name">
                        Update name:
                        <input
                            type="text"
                            id="full-name"
                            name="full-name"
                            className="update__input"
                            onChange={handleUsernameChange}
                            value={username}
                        />
                    </label>
                </div>
                <div className="update-form__group">
                    <label className="update__label" htmlFor="zip-code">
                        Update email:
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="update__input"
                            onChange={handleEmailChange}
                            value={email}
                        />
                    </label>
                </div>
                <div className="update-form__actions">
                    <Link to='/rides' className="update-form__cancel">
                        <button type="button"
                            className="update__button update__button--cancel"
                        >Cancel</button>
                    </Link>
                    <button
                        className="update__button"
                        type="button"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>

    );
}

export default Profile;
