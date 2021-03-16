import React, {useEffect} from "react";
import StopwatchTime from "../components/StopwatchTime";
import SplitsList from "../components/SplitsList";

const Stopwatch = () => {
	useEffect(() => {
		document.title = "Neat Timer - Stopwatch";
	}, []);

	return (
		<main>
			<StopwatchTime/>
			<SplitsList/>
		</main>
	);
};

export default Stopwatch;