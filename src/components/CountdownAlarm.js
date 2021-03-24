import React, {useEffect} from "react";
import {getTimeSpanStrings} from "../util.js";
import {useGlobalContext} from "../context";
import { GiStopwatch } from "react-icons/gi";
import NotificationIcon from "../img/notification-icon.png";
import {Helmet} from "react-helmet-async";
import {createAudioAndPlay} from "../data/alarmSounds";

const CountdownAlarm = () => {
	const {
		closeModal,
		countdownInitialTime,
		setCountdownTime,
		setCountdownOn,
		setCountdownStartTime,
		showNotification,
		countdownSettings: {
			title,
			volume,
			soundId
		}
	} = useGlobalContext();

	const {hours, minutes, seconds} = getTimeSpanStrings(countdownInitialTime);

	const restart = () => {
		setCountdownTime(countdownInitialTime);
		setCountdownOn(true);
		setCountdownStartTime(Date.now());
		closeModal();
	}

	useEffect(() => {
		const audio = createAudioAndPlay(soundId, volume, true);

		const notification = showNotification(
			(`${title}` || "Your timer reached zero") + "!!!",
			`${hours}:${minutes}:${seconds}`,
			NotificationIcon,
		);

		return () => {
			audio.pause();

			if (notification != null) {
				notification.close();
			}
		};
	}, [showNotification, hours, minutes, seconds, title, volume, soundId]);

	return (
		<React.Fragment>
			<Helmet>
				<title>{title || "Your timer reached zero"}!!!</title>
			</Helmet>
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