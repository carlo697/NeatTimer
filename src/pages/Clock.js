import React, {useState, useEffect} from "react";
import {useInterval} from "../util.js";
import {useGlobalContext} from "../context";
import ClockSettings from "../components/ClockSettings";
import {TiEdit} from "react-icons/ti";
import Loading from "../components/Loading";
import {Helmet} from "react-helmet-async";

const timeAPI = "https://worldtimeapi.org/api/ip";

const Clock = () => {
	const {
		openModal,
		clockSettings: {useAPI}
	} = useGlobalContext();

	const [responseTime, setResponseTime] = useState(new Date());
	const [apiTime, setApiTime] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(useAPI);

	useEffect(() => {
		if (!useAPI) {
			setError(false);
		}

	}, [useAPI]);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			try {
				const response = await fetch(timeAPI);
				const {unixtime} = await response.json();

				setApiTime(unixtime * 1000);
				setResponseTime(Date.now());
				setError(false);
			} catch(e) {
				console.log("Error fetching data!")
				console.log(e);

				setApiTime(Date.now());
				setResponseTime(Date.now());
				setError(true);
			}

			setIsLoading(false);
		}

		if (useAPI) {
			fetchData(); 
		}

	}, [useAPI]);

	useInterval(() => {
		if (useAPI) {
			const newTime = new Date(apiTime + (Date.now() - responseTime));

			setTime(newTime);
		} else {
			setTime(new Date());
		}
		
	}, 100);

	const capitalize = (text) => {
		return text.charAt(0).toUpperCase() + text.slice(1);
	};

	const formattedTime = Intl.DateTimeFormat("default", { hour: "numeric", minute: "numeric", second:"numeric", hour12: false }).format(time);
	const formattedDate = capitalize(Intl.DateTimeFormat("default", { dateStyle: "full"}).format(time));

	const edit = () => {
		openModal({
			title: "Clock Settings",
			content: <ClockSettings/>,
		});
	}

	if (isLoading) {
		return (
			<main className="clock-page">
				<Helmet>
					<title>Neat Timer - Clock</title>
				</Helmet>
				
				<h1>Clock</h1>
				<section>
					<Loading/>
				</section>
			</main>
		);
	}

	return (
		<main className="clock-page">
			<Helmet>
				<title>Neat Timer - Clock</title>
			</Helmet>

			<h1>Clock</h1>
			<section>
				<div className="timer">
					{formattedTime}
				</div>
				<div className="date">
					{formattedDate}
				</div>
				{
					error && (
						<div className="error">
							<strong>Error:</strong> The data can't be fetched from the API.
						</div>
					)
				}
				<div className="btn-container">
					<button className="btn btn-blue" onClick={edit}>
						<TiEdit className="icon"/> Edit
					</button>
				</div>
			</section>
		</main>
	);
};

export default Clock;