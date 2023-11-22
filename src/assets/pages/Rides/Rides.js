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
				<h3>Welcome back, {user.full_name}</h3>
				<div className="form-rides" id="search-form">
					<input className='form-rides__input' type="text" id="starting-zip" name="starting-zip" placeholder='Starting Zip' />

					<input className='form-rides__input' type="text" id="ending-zip" name="ending-zip" placeholder="Ending Zip" />

					<div className="form-rides__group">
						<input className='form-rides__input' type="text" id="departure-time" name="departure-time" placeholder="Departure Time" />
						<select className='form-rides__select' id="departure-am-pm" name="departure-am-pm">
							<option value="AM">🕕 AM</option>
							<option value="PM">🕕 PM</option>
						</select>
					</div>

					<div className="form-rides__group">
						<input className='form-rides__input' type="text" id="return-time" name="return-time" placeholder="Return Time" />
						<select className='form-rides__select' id="return-am-pm" name="return-am-pm">
							<option value="AM">🕕 AM</option>
							<option value="PM">🕕 PM</option>
						</select>
					</div>

					<button className='form-rides__button' type="button" onClick={submitForm}>
						Search 🚙 
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
