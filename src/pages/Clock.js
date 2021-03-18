import React, {useState, useEffect} from "react";
import {useInterval} from "../util.js";
import {useGlobalContext} from "../context";
import ClockSettings from "../components/ClockSettings";
import {TiEdit} from "react-icons/ti";

const Clock = () => {
	useEffect(() => {
		document.title = "Neat Timer - Clock";
	}, []);

	const {
		openModal
	} = useGlobalContext();

	const [areSettingsChanged, setAreSettingsChange] = useState(false);

	const [time, setTime] = useState(new Date());

	useEffect(() => {
		if (areSettingsChanged) {
			console.log("Reload");

			setAreSettingsChange(false);
		}
	}, [areSettingsChanged]);

	const edit = () => {
		openModal({
			title: "Clock Settings",
			content: <ClockSettings/>,
			extra: {
				onSave: () => setAreSettingsChange(true)
			}
		});
	}

	useInterval(() => {
		setTime(new Date());
	}, 100);

	const capitalize = (text) => {
		return text.charAt(0).toUpperCase() + text.slice(1);
	};

	const formattedTime = Intl.DateTimeFormat("default", { hour: "numeric", minute: "numeric", second:"numeric", hour12: false }).format(time);
	const formattedDate = capitalize(Intl.DateTimeFormat("default", { dateStyle: "full"}).format(time));

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