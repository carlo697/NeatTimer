import React, {useEffect} from "react";
import CountdownTime from "../components/CountdownTime";
import NotificationRequester from "../components/NotificationRequester";

const Countdown = () => {
	useEffect(() => {
		document.title = "Neat Timer - Countdown";
	}, []);

	return (
		<main>
			<h1>Countdown Timer</h1>
			<CountdownTime/>
			<NotificationRequester/>
		</main>
	);
};

export default Countdown;