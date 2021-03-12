import React from "react";
import {useInterval, useLocalStorage, getTimeSpanStrings} from "../util.js";
import {useGlobalContext} from "../context";
import {TiEdit} from "react-icons/ti";
import CountdownSettings from "./CountdownSettings";

const CountdownTime = () => {
	const {openModal, countdownSettings} = useGlobalContext();

	const [isOn, setIsOn] = useLocalStorage("isCountdownOn", false);
	const initialTime = (
		countdownSettings.hours * 3600000 +
		countdownSettings.minutes * 60000 +
		countdownSettings.seconds * 1000
	);

	const [startTime, setStartTime] = useLocalStorage("countdownStartTime", 0);
	const [time, setTime] = useLocalStorage("countdownTime", initialTime);

	useInterval(() => {
		const elapsedMiliseconds = Date.now() - startTime;
		const newTime = new Date(elapsedMiliseconds);

		if (newTime > initialTime) {
			setIsOn(false);
			setTime(0);
			return;
		}
		
		setTime(initialTime - newTime.getTime());

	}, isOn ? 50 : null);

	const start = () => {
		setIsOn(true);
		setStartTime(Date.now());
	};

	const stop = () => {
		setIsOn(false);
	};

	const restart = () => {
		setTime(initialTime);
		setIsOn(false);
	};

	const edit = () => {
		openModal({
			title: "Edit Countdown Timer",
			content: <CountdownSettings/>
		});
	}

	const {hours, minutes, seconds, centiseconds} = getTimeSpanStrings(time);

	return (
		<section>
			<div className="timer">
				{
					`${hours}:${minutes}:${seconds}`
				}
				<span className="centiseconds">
					{
						`.${centiseconds}`
					}
				</span>
			</div>

			<div className="btn-container">
				<button className="btn btn-blue" onClick={edit}>
					<TiEdit className="icon"/> Edit
				</button>

				<button className="btn btn-orange" onClick={restart} disabled={time === initialTime}>
					Restart
				</button>

				{
					isOn ?
						<button className="btn btn-red" onClick={stop}>
							Stop
						</button>
						:
						<button className="btn btn-green" onClick={start}>
							Start
						</button>
				}
			</div>
		</section>
	);
};

export default CountdownTime;