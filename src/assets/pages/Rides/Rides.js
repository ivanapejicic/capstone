import "./Rides.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import Trip from "../../components/Trip/Trip";

function Rides() {
	const [user, setUser] = useState(null);
	const [failedAuth, setFailedAuth] = useState(false);
	const [trips, setTrips] = useState([]);
	const [users, setUsers] = useState([]);
	const [foundTrips, setFoundTrips] = useState([]);

	//currently logged in user
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
				setUsers(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// all trips
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

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		setUser(null);
		setFailedAuth(true);
		alert("Logout Successful! 👋🔒");

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
	// form data
	const handleSearch = (event) => {
		event.preventDefault();
		const startingZip = event.target.starting_zip.value;
		const endingZip = event.target.ending_zip.value;

		const filteredTrips = trips.filter((trip) => {
			return trip.start_location === startingZip && trip.end_location === endingZip;
		});

		setFoundTrips(filteredTrips);
	};

	return (
		<>
			<HeaderProfile />
			<main className="dashboard">
				<h2>Welcome back, {user.full_name}</h2>
				<h3>Type your travel details below and find potential travel buddies.</h3>
				<form className="form-rides" id="search-form" onSubmit={handleSearch}>
					<input
						className='form-rides__input'
						type="text" id="starting_zip"
						name="starting_zip"
						placeholder='Starting Zip Code'
					/>

					<input
						className='form-rides__input'
						type="text" id="ending_zip"
						name="ending_zip"
						placeholder="Ending Zip"
					/>

					<div className="form-rides__group">
						<label htmlFor="departure-time">Departure Time</label>
						<select
							className="form-rides__select"
							id="departure-time"
							name="departure-time">
							{Array.from({ length: 24 }, (_, i) => (
								<option key={i} value={i}>
									{i < 10 ? `0${i}:00` : `${i}:00`}
								</option>
							))}
						</select>
					</div>

					<div className="form-rides__group">
						<label htmlFor="return-time">Return Time</label>
						<select
							className="form-rides__select"
							id="return-time"
							name="return-time">
							{Array.from({ length: 24 }, (_, i) => (
								<option key={i} value={i}>
									{i < 10 ? `0${i}:00` : `${i}:00`}
								</option>
							))}
						</select>
					</div>


					<button className='form-rides__button' type="submit">
						Search 🚙
					</button>

				</form>
				{foundTrips.length > 0 && (
					<div className='dashboard__results'>
						<h3>Found Trips:</h3>
						<ul>
							{foundTrips.map((trip) => (
								<div key={trip.trip_id}>
									<Trip users={users} user={user} trip={trip} />
								</div>

							))}
						</ul>
					</div>
				)}
				<div className="rides-buttons">
					<button className="rides-buttons__button">
						Offer a ride  🚙
					</button>
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
