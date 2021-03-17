import React, {useState, useEffect} from "react";
import {useInterval} from "../util.js";

const Clock = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		document.title = "Neat Timer - Clock";
	}, []);

	useInterval(() => {
		setTime(new Date());
	}, 100);

	const capitalize = (text) => {
		return text.charAt(0).toUpperCase() + text.slice(1);
	};

	const formattedTime = Intl.DateTimeFormat("default", { hour: "numeric", minute: "numeric", second:"numeric", hour12: false }).format(time);
	const formattedDate = capitalize(Intl.DateTimeFormat("default", { dateStyle: "full"}).format(time));

	return (
		<main>
			<section>
				<div className="timer">
					{formattedTime}
				</div>
				<div>
					{formattedDate}
				</div>
			</section>
		</main>
	);
};

export default Clock;