import React, {useState} from "react";

const AlarmSettings = ({alarm}) => {
	const [settings, setSettings] = useState(alarm);

	console.log(settings)

	return (
		<h2>Hello World</h2>
	);
};

export default AlarmSettings;