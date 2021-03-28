import React, {useEffect} from "react";
import {getTimeSpanStrings} from "../util.js";
import {useGlobalContext} from "../context";
import {GiAlarmClock} from "react-icons/gi";
import NotificationIcon from "../img/notification-icon.png";
import {Helmet} from "react-helmet-async";
import {createAudioAndPlay} from "../data/alarmSounds";

const AlarmModal = () => {
	const {
		modal,
		closeModal,
		showNotification
	} = useGlobalContext();

	const {
		alarm: {
			title,
			hours,
			minutes,
			volume,
			soundId,
		}
	} = modal;

	const {
		hours: formattedHours,
		minutes: formattedMinutes
	} = getTimeSpanStrings(hours * 3600000 + minutes * 60000);

	useEffect(() => {
		const audio = createAudioAndPlay(soundId, volume, true);

		const notification = showNotification(
			(title || "Alarm") + "!!!",
			`${formattedHours}:${formattedMinutes}`,
			NotificationIcon,
		);

		return () => {
			audio.pause();

			if (notification) {
				notification.close();
			}
		};
	}, [showNotification, formattedHours, formattedMinutes, title, volume, soundId]);

	return (
		<React.Fragment>
			<Helmet>
				<title>{title || "Alarm"}!!!</title>
			</Helmet>
			<div className="modal-center">
				<GiAlarmClock className="modal-alarm-icon"/>
				<div className="timer">
					{
						`${formattedHours}:${formattedMinutes}`
					}
				</div>
			</div>
			<footer>
				<button type="submit" className="btn btn-green" onClick={closeModal}>
					OK
				</button>
			</footer>
		</React.Fragment>
	);
}

export default AlarmModal;