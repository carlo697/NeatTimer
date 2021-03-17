import React, {useEffect} from "react";
import CountdownTime from "../components/CountdownTime";
import NotificationRequester from "../components/NotificationRequester";

const Countdown = () => {
	useEffect(() => {
		document.title = "Neat Timer - Countdown";
	}, []);

	return (
		<main>
			<CountdownTime/>
			<NotificationRequester/>
		</main>
	);
};

export default Countdown;