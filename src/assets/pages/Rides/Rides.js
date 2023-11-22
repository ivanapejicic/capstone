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
	console.log('User object:', user);

	return (
		<>
			<HeaderProfile />
			<main className="dashboard">
				<p>
					Welcome back, {user.full_name}
				</p>
				<button className="dashboard__logout" onClick={handleLogout}>
					Log out
				</button>

			</main>
		</>
	);
}

export default Rides;
