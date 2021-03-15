import React, {useState, useEffect} from "react";
import {getTimeSpanStrings} from "../util.js";
import {useGlobalContext} from "../context";
import {TiEdit} from "react-icons/ti";
import CountdownSettings from "./CountdownSettings";

const CountdownTime = () => {
	const {
		openModal,
		countdownTime,
		setCountdownTime,
		setCountdownOn,
		setCountdownStartTime,
		countdownOn,
		countdownInitialTime
	} = useGlobalContext();
	
	const [areSettingsChanged, setAreSettingsChange] = useState(false);

	const start = () => {
		setCountdownOn(true);
		setCountdownStartTime(Date.now());
	};

	const stop = () => {
		setCountdownOn(false);
	};

	const restart = () => {
		setCountdownTime(countdownInitialTime);
		setCountdownOn(false);
	};

	useEffect(() => {
		if (areSettingsChanged) {
			setAreSettingsChange(false);
			setCountdownOn(true);
			setCountdownStartTime(Date.now());
		}
	}, [areSettingsChanged, setCountdownOn, setCountdownStartTime]);

	const edit = () => {
		openModal({
			title: "Edit Countdown Timer",
			content: <CountdownSettings/>,
			extra: {
				onSave: () => setAreSettingsChange(true)
			}
		});
	}

	const {hours, minutes, seconds, centiseconds} = getTimeSpanStrings(countdownTime);

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

				<button className="btn btn-orange" onClick={restart} disabled={countdownTime === countdownInitialTime}>
					Restart
				</button>

				{
					countdownOn ?
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