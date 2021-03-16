import React, {useEffect} from "react";
import CountdownTime from "../components/CountdownTime";

const Countdown = () => {
	useEffect(() => {
		document.title = "Neat Timer - Countdown";
	}, []);

	return (
		<main>
			<CountdownTime/>
		</main>
	);
};

export default Countdown;