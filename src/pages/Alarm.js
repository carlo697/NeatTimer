import React from "react";
import SettingsModal from "../components/SettingsModal";
import SingleAlarm from "../components/SingleAlarm";
import {useGlobalContext} from "../context";
import {Helmet} from "react-helmet-async";

const defaultAlarm = {
	id: Date.now().toString(),
	title: "New Alarm",
	hours: 12,
	minutes: 0,
	volume: 1,
	soundId: "0",
};

const Alarm = () => {
	const {
		openModal,
		alarms,
		saveAlarm
	} = useGlobalContext();

	const validateAlarm = (settings) => {
		// get date at midnight
		const midnight = new Date().setHours(0,0,0,0);

		// ms since midnight
		const elapsedSinceMidnight = new Date() - midnight;
		// ms to play the alarm since midnight
		const msToAlarm = settings.hours * 3600000 + settings.minutes * 60000;

		const lastDate = elapsedSinceMidnight > msToAlarm ?
			midnight : midnight - 86400000;

		return {
			...settings,
			lastDate: lastDate,
		}
	}

	const clickAdd = () => {
		const newAlarm = {...defaultAlarm};

		openModal({
			title: "Alarm Settings",
			content: <SettingsModal
				oldSettings={newAlarm}
				saveSettings={saveAlarm}
				beforeSave={validateAlarm}
				/>,
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