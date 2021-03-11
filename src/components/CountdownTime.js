import React, {useState} from "react";
import {useInterval, useLocalStorage, getTimeSpanStrings} from "../util.js";
import {useGlobalContext} from "../context";
import {TiEdit} from "react-icons/ti";

const CountdownTime = () => {
	const {openModal} = useGlobalContext();

	const [isOn, setIsOn] = useLocalStorage("isCountdownOn", false);
	const [initialTime, setInitialTime] = useLocalStorage("countdownInitialTime", 60000);
	const [startTime, setStartTime] = useLocalStorage("countdownStartTime", 0);
	const [time, setTime] = useLocalStorage("countdownTime", initialTime);

	const {hours, minutes, seconds, centiseconds} = getTimeSpanStrings(time);

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
			content: "Example"
		});
	}

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