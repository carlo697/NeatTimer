import React from "react";
import {getTimeSpanStrings} from "../util.js";
import {useGlobalContext} from "../context";
import { GiStopwatch } from "react-icons/gi";

const CountdownAlarm = () => {
	const {
		closeModal,
		countdownInitialTime,
		setCountdownTime,
		setCountdownOn,
		setCountdownStartTime
	} = useGlobalContext();

	const {hours, minutes, seconds} = getTimeSpanStrings(countdownInitialTime);

	const restart = () => {
		setCountdownTime(countdownInitialTime);
		setCountdownOn(true);
		setCountdownStartTime(Date.now());
		closeModal();
	}

	return (
		<React.Fragment>
			<div className="modal-center">
				<GiStopwatch className="modal-alarm-icon"/>

				<div className="timer">
					{
						`${hours}:${minutes}:${seconds}`
					}
				</div>

			</div>
			<footer>
				<button type="submit" className="btn btn-green" onClick={restart}>
					Restart
				</button>
				<button type="submit" className="btn btn-red" onClick={closeModal}>
					OK
				</button>
			</footer>
		</React.Fragment>
	);
}

export default CountdownAlarm;