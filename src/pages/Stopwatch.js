import React from "react";
import StopwatchTime from "../components/StopwatchTime";
import SplitsList from "../components/SplitsList";

const Stopwatch = () => {
	return (
		<main>
			<StopwatchTime/>
			<SplitsList/>
		</main>
	);
};

export default Stopwatch;