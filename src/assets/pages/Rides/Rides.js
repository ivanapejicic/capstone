import "./Rides.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";

function Rides() {
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
			})
			.catch((error) => {
				console.log(error);
				setFailedAuth(true)
			})

		axios
			.get("http://localhost:8080/users", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log('user auth', response);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		setUser(null);
		setFailedAuth(true);

	};

	if (failedAuth) {
		return (
			<main className="dashboard">
				<p>You must be logged in to see this page.</p>
				<p>
					<Link to="/login">Log in</Link>
				</p>
			</main>
		);
	}

	if (user === null) {
		return (
			<main className="dashboard">
				<p>Loading...</p>
			</main>
		);
	}
	function submitForm() {
		console.log('Form submitted!');
	}


	return (
		<>
			<HeaderProfile />
			<main className="dashboard">
				<p>Welcome back, {user.full_name}</p>
				<div className="form" id="search-form">
					{/* <label className='form__label' htmlFor="starting-zip">Starting Zip:</label> */}
					<input className='form__input' type="text" id="starting-zip" name="starting-zip" placeholder='Starting Zip' />

					{/* <label className='form__label' htmlFor="ending-zip">Ending Zip:</label> */}
					<input className='form__input' type="text" id="ending-zip" name="ending-zip" placeholder="Ending Zip" />

					{/* <label className='form__label' htmlFor="departure-time">Departure Time:</label> */}
					<input className='form__input' type="text" id="departure-time" name="departure-time" placeholder="Departure Time" />
					<select className='form__select' id="departure-am-pm" name="departure-am-pm">
						<option value="AM">AM</option>
						<option value="PM">PM</option>
					</select>

					{/* <label className='form__label' htmlFor="return-time">Return Time:</label> */}
					<input className='form__input' type="text" id="return-time" name="return-time" placeholder="Return Time" />
					<select className='form__select' id="return-am-pm" name="return-am-pm">
						<option value="AM">AM</option>
						<option value="PM">PM</option>
					</select>

					<button className='form__button' type="button" onClick={submitForm}>
						Search
					</button>
				</div>
				<button className="dashboard__logout" onClick={handleLogout}>
					Log out
				</button>
			</main>
		</>
	);


}
export default Rides;
