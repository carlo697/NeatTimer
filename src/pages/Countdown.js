import React from "react";
import CountdownTime from "components/CountdownTime";
import NotificationRequester from "components/NotificationRequester";
import {Helmet} from "react-helmet-async";

const Countdown = () => {
	return (
		<main>
			<Helmet>
				<title>Neat Timer - Countdown</title>
			</Helmet>
			<h1>Countdown Timer</h1>
			<CountdownTime/>
			<NotificationRequester/>
		</main>
	);
};

export default Countdown;