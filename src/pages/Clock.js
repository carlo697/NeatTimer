import React, {useEffect} from "react";

const Clock = () => {
	useEffect(() => {
		document.title = "Neat Timer - Clock";
	}, []);

	return (
		<main>

		</main>
	);
};

export default Clock;