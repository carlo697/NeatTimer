import React, {useContext, useState} from "react";
import {useLocalStorage} from "./util.js";

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
	const [splits, setSplits] = useLocalStorage("splits", []);

	const addSplit = split => {
		const number = splits.length + 1;
		const totalTime = split;
		const time = splits.length === 0 ? totalTime : totalTime - splits[splits.length - 1].totalTime;

		setSplits([...splits, {
			number,
			totalTime,
			time
		}]);
	};

	const clearSplits = () => {
		setSplits([]);
	};

	return (
		<AppContext.Provider
			value={{
				splits,
				addSplit,
				clearSplits
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
}