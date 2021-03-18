import React, {useEffect} from "react";
import AlarmSettings from "../components/AlarmSettings";
import {useGlobalContext} from "../context";

const Alarm = () => {
	const {
		openModal,
	} = useGlobalContext();

	useEffect(() => {
		document.title = "Neat Timer - Alarm";
	}, []);

	const clickAdd = () => {
		const newAlarm = {
			id: Date.now().toString(),
			title: "New Alarm",
			hour: 12,
			minute: 0,
		};

		openModal({
			title: "Alarm Settings",
			content: <AlarmSettings alarm={newAlarm} />,
		});
	}

	return (
		<main>
			<h1>Alarm</h1>
			<section>
				<div className="btn-container">
					<button className="btn btn-blue" onClick={clickAdd}>
						Add
					</button>
				</div>
			</section>
		</main>
	);
};

export default Alarm;