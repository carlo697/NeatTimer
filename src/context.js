import React, {useContext, useState, useCallback} from "react";
import {useLocalStorage, useInterval} from "./util.js";
import CountdownAlarm from "./components/CountdownAlarm";
import AlarmModal from "./components/AlarmModal";

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
	const [splits, setSplits] = useLocalStorage("splits", []);

	const [modal, setModal] = useState({
		isOpen: false,
		title: "",
		content: null,
	});

	// countdown
	const [countdownSettings, setCountdownSettings] = useLocalStorage(
		"countdownSettings", {
			hours: 0,
			minutes: 1,
			seconds: 0
		}
	);
	const countdownInitialTime = (
		countdownSettings.hours * 3600000 +
		countdownSettings.minutes * 60000 +
		countdownSettings.seconds * 1000
	);
	const [countdownOn, setCountdownOn] = useLocalStorage("countdownOn", false);
	const [countdownStartTime, setCountdownStartTime] = useLocalStorage("countdownStartTime", 0);
	const [countdownTime, setCountdownTime] = useLocalStorage("countdownTime", countdownInitialTime);

	// notifications
	const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

	// clock
	const [clockSettings, setClockSettings] = useLocalStorage("clockSettings", {
		useAPI: true,
	});

	// alarms
	const [alarms, setAlarms] = useLocalStorage("alarms", []);

	// check alarms
	useInterval(() => {
		// check countdown
		if (countdownOn) {
			const elapsedMiliseconds = Date.now() - countdownStartTime;
			const newTime = new Date(elapsedMiliseconds);

			if (newTime > countdownInitialTime) {
				setCountdownOn(false);
				setCountdownTime(0);

				// Alarm
				openCountdownAlarm();
				return;
			}

			setCountdownTime(countdownInitialTime - newTime.getTime());
		}

		// check alarms
		alarms.forEach(alarm => {
			const {title, hour, minute, lastDate} = alarm;

			// get date at midnight
			const midnight = new Date().setHours(0,0,0,0);

			const elapsedSinceMidnight = new Date() - midnight;
			const msToAlarm = hour * 3600000 + minute * 60000;

			// check if alarm should be played to the user
			if (elapsedSinceMidnight > msToAlarm) {
				
				const lastTimePlayed = new Date(lastDate);

				// has this alarm been played today?
				if (lastTimePlayed < midnight) {
					openModal({
						title: title,
						content: <AlarmModal/>,
						alarm: alarm,
					});

					alarm.lastDate = midnight;
					setAlarms([...alarms]);
				}
			}
		});
	}, 50);

	const addSplit = split => {
		const number = splits.length + 1;
		const totalTime = split;
		const time = splits.length === 0 ? totalTime : totalTime - splits[splits.length - 1].totalTime;

		setSplits([...splits, {
			number,
			totalTime,
			time,
		}]);
	};

	const clearSplits = () => {
		setSplits([]);
	};

	const openModal = (content) => {
		setModal({
			...content,
			isOpen: true,
		});
	}

	const closeModal = () => {
		setModal({
			isOpen: false,
			title: "",
			content: null,
		});
	}

	const openCountdownAlarm = () => {
		openModal({
			title: "Countdown",
			content: <CountdownAlarm/>
		});
	};

	const showNotification = useCallback((title, text, icon) => {
		if (notificationPermission === "granted") {
			return new Notification(title, {
				body: text,
				icon: icon,
			});
		}

		return null;
	}, [notificationPermission]);

	const saveAlarm = (alarm) => {
		const existing = alarms.find(item => item.id === alarm.id);

		if (existing) {

		} else {
			setAlarms([
				...alarms,
				alarm
			]);
		}
	};

	const removeAlarm = (id) => {
		setAlarms(
			alarms.filter(item => item.id !== id)
		);
	}

	return (
		<AppContext.Provider
			value={{
				splits,
				addSplit,
				clearSplits,
				openModal,
				closeModal,
				modal,
				// countdown
				countdownSettings,
				setCountdownSettings,
				countdownTime,
				setCountdownTime,
				setCountdownOn,
				setCountdownStartTime,
				countdownOn,
				countdownInitialTime,
				//notifications
				notificationPermission,
				setNotificationPermission,
				showNotification,
				//clock
				clockSettings,
				setClockSettings,
				//alarm
				alarms,
				saveAlarm,
				removeAlarm,
				}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
}