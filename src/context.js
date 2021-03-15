import React, {useContext, useState} from "react";
import {useLocalStorage} from "./util.js";

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
	const [splits, setSplits] = useLocalStorage("splits", []);

	const [isOpenModal, setIsOpenModal] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState(null);
	const [modalExtra, setModalExtra] = useState(null);

	const [countdownSettings, setCountdownSettings] = useLocalStorage(
		"countdownSettings", {
			hours: 0,
			minutes: 1,
			seconds: 0
		}
	);

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
				countdownSettings,
				setCountdownSettings,
				}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
}