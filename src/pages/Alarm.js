import React, {useEffect} from "react";

const Alarm = () => {
	useEffect(() => {
		document.title = "Neat Timer - Alarm";
	}, []);

	return (
		<main>
			<h1>Alarm</h1>
			<section>
			</section>
		</main>
	);
};

export default Alarm;