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
				<h2>Welcome back, {user.full_name}</h2>
				<h3>Type your travel details below and find potential travel buddies.</h3>
				<div className="form-rides" id="search-form">
					<input className='form-rides__input' type="text" id="starting-zip" name="starting-zip" placeholder='Starting Zip' />

					<input className='form-rides__input' type="text" id="ending-zip" name="ending-zip" placeholder="Ending Zip" />

					<div className="form-rides__group">
						<label htmlFor="departure-time">Departure Time</label>
						<select className="form-rides__select" id="departure-time" name="departure-time">
							{Array.from({ length: 24 }, (_, i) => (
								<option key={i} value={i}>
									{i < 10 ? `0${i}:00` : `${i}:00`}
								</option>
							))}
						</select>
					</div>

					<div className="form-rides__group">
						<label htmlFor="return-time">Return Time</label>
						<select className="form-rides__select" id="return-time" name="return-time">
							{Array.from({ length: 24 }, (_, i) => (
								<option key={i} value={i}>
									{i < 10 ? `0${i}:00` : `${i}:00`}
								</option>
							))}
						</select>
					</div>


					<button className='form-rides__button' type="button" onClick={submitForm}>
						Search 🚙
					</button>
					<button className="form-rides__button">
						Offer a ride  🚙
					</button>
				</div>
				<div className="rides-buttons">
					<div className='your-rides'>
						<Link to='/your-rides'><button className="rides-buttons__button">Edit your existing rides</button></Link>
					</div>
					<button className="rides-buttons__button" onClick={handleLogout}>
						Log out
					</button>
				</div>
			</main>
		</>
	);


}
export default Rides;
