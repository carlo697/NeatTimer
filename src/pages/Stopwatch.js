import React, {useEffect} from "react";
import StopwatchTime from "../components/StopwatchTime";
import SplitsList from "../components/SplitsList";

const Stopwatch = () => {
	useEffect(() => {
		document.title = "Neat Timer - Stopwatch";
	}, []);

	return (
		<main>
			<h1>Stopwatch</h1>
			<StopwatchTime/>
			<SplitsList/>
		</main>
	);
};

export default Stopwatch;