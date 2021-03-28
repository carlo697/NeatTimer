import React, {useState, useEffect} from "react";
import {getTimeSpanStrings} from "../util.js";
import {useGlobalContext} from "../context";
import {TiEdit} from "react-icons/ti";
import {ImPause2, ImPlay3} from "react-icons/im";
import {VscDebugRestart} from "react-icons/vsc";
import SettingsModal from "./SettingsModal";

const CountdownTime = () => {
	const {
		openModal,
		countdownTime,
		setCountdownTime,
		setCountdownOn,
		setCountdownStartTime,
		countdownOn,
		countdownInitialTime,
		countdownSettings,
		countdownSettings: {
			title
		},
		setCountdownSettings
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
			content: <SettingsModal
				oldSettings={countdownSettings}
				saveSettings={setCountdownSettings}
				/>,
			onSave: () => setAreSettingsChange(true),
		});
	}

	const {hours, minutes, seconds, centiseconds} = getTimeSpanStrings(countdownTime);

	return (
		<section>
			<h2>{title}</h2>

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

				<button className="btn small btn-orange" onClick={restart} disabled={countdownTime === countdownInitialTime}>
					<VscDebugRestart className="icon"/>
				</button>

				{
					countdownOn ?
						<button className="btn small btn-red" onClick={stop}>
							<ImPause2 className="icon"/>
						</button>
						:
						<button className="btn small btn-green" onClick={start}>
							<ImPlay3 className="icon"/>
						</button>
				}
			</div>
		</section>
	);
};

export default CountdownTime;