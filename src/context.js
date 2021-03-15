import React, {useContext, useState} from "react";
import {useLocalStorage, useInterval} from "./util.js";
import CountdownAlarm from "./components/CountdownAlarm";

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
	const [splits, setSplits] = useLocalStorage("splits", []);

	const [isOpenModal, setIsOpenModal] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState(null);
	const [modalExtra, setModalExtra] = useState(null);

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

	// check alarms
	useInterval(() => {
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

	const openModal = ({title, content, extra}) => {
		setIsOpenModal(true);
		setModalTitle(title);
		setModalContent(content);
		setModalExtra(extra);
	}

	const closeModal = () => {
		setIsOpenModal(false);
		setModalTitle("");
		setModalContent(null);
	}

	const openCountdownAlarm = () => {
		openModal({
			title: "Countdown",
			content: <CountdownAlarm/>
		});
	};

	return (
		<AppContext.Provider
			value={{
				splits,
				addSplit,
				clearSplits,
				isOpenModal,
				modalTitle,
				modalContent,
				openModal,
				closeModal,
				modalExtra,
				// countdown
				countdownSettings,
				setCountdownSettings,
				countdownTime,
				setCountdownTime,
				setCountdownOn,
				setCountdownStartTime,
				countdownOn,
				countdownInitialTime,
				}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
}