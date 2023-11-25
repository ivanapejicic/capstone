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
	const [action, setAction] = useState('search');
	const [notification, setNotification] = useState(null);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const formattedTime = (time) => (time < 10 ? `0${time}:00:00` : `${time}:00:00`);

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
				<h1>You must be logged in to see this page.</h1>
				<h2>
					<Link to="/login">Log in</Link>
				</h2>
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
	const handleActionChange = (event) => {
		setAction(event.target.value);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		setFormSubmitted(true);

		if (action === 'search') {
			const startingZip = event.target.starting_zip.value;
			const endingZip = event.target.ending_zip.value;

			const filteredTrips = trips.filter((trip) => {
				return trip.start_location === startingZip && trip.end_location === endingZip;
			});

			setFoundTrips(filteredTrips);
		} else if (action === 'offer') {
			try {
				axios.post("http://localhost:8080/trips", {
					start_location: event.target.starting_zip.value,
					end_location: event.target.ending_zip.value,
					departure_time: formattedTime(event.target.departure_time.value),
					return_time: formattedTime(event.target.return_time.value),
					user_id: user.user_id
				});
				setNotification('Ride posted successfully!');
				setFoundTrips([]);

			} catch (error) {
				console.error('Error offering trip:', error);
				setNotification('Failed to post ride. Please try again.');
			}
		}
	};


	return (
		<>
			<HeaderProfile />
			<main className="dashboard">
				<h1 className="dashboard__title">Welcome back, {user.full_name}</h1>
				<h2 className="dashboard__subtitle">Type your travel details below and find potential travel buddies.</h2>
				<form className="form-rides" id="search-form" onSubmit={handleFormSubmit}>
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
							id="departure_time"
							name="departure_time">
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
							id="return_time"
							name="return_time">
							{Array.from({ length: 24 }, (_, i) => (
								<option key={i} value={i}>
									{i < 10 ? `0${i}:00` : `${i}:00`}
								</option>
							))}
						</select>
					</div>
					<div className="form-rides__group">
						<label>Action:</label>
						<label>
							<input
								type="radio"
								name="action"
								value="search"
								checked={action === 'search'}
								onChange={handleActionChange}
							/>
							Search
						</label>
						<label>
							<input
								type="radio"
								name="action"
								value="offer"
								checked={action === 'offer'}
								onChange={handleActionChange}
							/>
							Offer
						</label>
					</div>


					<button className='form-rides__button' type="submit">
						{action === 'search' ? 'Search 🚙' : 'Offer 🚗'}
					</button>

				</form>

				{formSubmitted && action === 'search' && foundTrips.length === 0 && (
					<div className="no-matching-rides">
						<p>Sorry, no matching rides. Try adjusting your search criteria.</p>
					</div>
				)}

				{foundTrips.length > 0 && (
					<div className='dashboard__results'>
						<h3>Found Trips:</h3>
						<ul className='dashboard__results-container'>
							{foundTrips.map((trip) => (
								<div key={trip.trip_id}>
									<Trip users={users} user={user} trip={trip} />
								</div>

							))}
						</ul>
					</div>
				)}

				{notification && (
					<div className="notification">
						<p>{notification}</p>
					</div>
				)}
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
