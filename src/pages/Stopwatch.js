import React from "react";
import StopwatchTime from "../components/StopwatchTime";
import SplitsList from "../components/SplitsList";
import {Helmet} from "react-helmet";

const Stopwatch = () => {
	return (
		<main>
			<Helmet>
				<title>Neat Timer - Stopwatch</title>
			</Helmet>

			<h1>Stopwatch</h1>
			<StopwatchTime/>
			<SplitsList/>
		</main>
	);
};

export default Stopwatch;