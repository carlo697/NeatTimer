import React from "react";
import AlarmSettings from "../components/AlarmSettings";
import SingleAlarm from "../components/SingleAlarm";
import {useGlobalContext} from "../context";
import {Helmet} from "react-helmet-async";

const Alarm = () => {
	const {
		openModal,
		alarms
	} = useGlobalContext();

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
			<Helmet>
				<title>Neat Timer - Alarm</title>
			</Helmet>

			<h1>Alarm</h1>
			<section>
				<div>
					{
						alarms.map((alarm) => {
							return <SingleAlarm key={alarm.id} {...alarm} />;
						})
					}
				</div>
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