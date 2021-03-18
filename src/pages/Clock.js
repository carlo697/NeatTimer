import React, {useState, useEffect} from "react";
import {useInterval} from "../util.js";
import {useGlobalContext} from "../context";
import ClockSettings from "../components/ClockSettings";
import {TiEdit} from "react-icons/ti";

const timeAPI = "http://worldtimeapi.org/api/ip";

const Clock = () => {
	useEffect(() => {
		document.title = "Neat Timer - Clock";
	}, []);

	const {
		openModal,
		clockSettings: {useAPI}
	} = useGlobalContext();

	const [responseTime, setResponseTime] = useState(new Date());
	const [apiTime, setApiTime] = useState(new Date());
	const [time, setTime] = useState(new Date(0));

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(timeAPI);
			const {unixtime} = await response.json();

			setApiTime(unixtime * 1000);
			setResponseTime(Date.now());
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

	return (
		<main>
			<h1>Clock</h1>
			<section>
				<div className="timer">
					{formattedTime}
				</div>
				<div>
					{formattedDate}
				</div>
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