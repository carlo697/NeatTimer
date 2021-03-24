import React, {useEffect} from "react";
import {getTimeSpanStrings} from "../util.js";
import {useGlobalContext} from "../context";
import {GiAlarmClock} from "react-icons/gi";
import Clock from "../sounds/clock.mp3";
import NotificationIcon from "../img/notification-icon.png";
import {Helmet} from "react-helmet-async";

const AlarmModal = () => {
	const {
		modal,
		closeModal,
		showNotification
	} = useGlobalContext();

	const {
		alarm: {
			title,
			hour,
			minute,
			volume,
		}
	} = modal;

	const {hours, minutes} = getTimeSpanStrings(hour * 3600000 + minute * 60000);

	useEffect(() => {
		const audio = new Audio(Clock);
		audio.loop = true;
		audio.volume = volume;
		audio.play();

		const notification = showNotification(
			(title || "Alarm") + "!!!",
			`${hours}:${minutes}`,
			NotificationIcon,
		);

		return () => {
			audio.pause();

			if (notification) {
				notification.close();
			}
		};
	}, [showNotification, hours, minutes, title, volume]);

	return (
		<React.Fragment>
			<Helmet>
				<title>{title || "Alarm"}!!!</title>
			</Helmet>
			<div className="modal-center">
				<GiAlarmClock className="modal-alarm-icon"/>
				<div className="timer">
					{
						`${hours}:${minutes}`
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