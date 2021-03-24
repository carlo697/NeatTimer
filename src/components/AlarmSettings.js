import React, {useState, useEffect, useRef} from "react";
import {useGlobalContext} from "../context";
import { FaAngleUp } from 'react-icons/fa';

const AlarmSettings = ({alarm}) => {
	const {
		closeModal,
		saveAlarm
	} = useGlobalContext();

	const [settings, setSettings] = useState(alarm);
	const titleRef = useRef(null);

	const {hour, minute, title, volume} = settings;

	useEffect(() => {
		titleRef.current.focus();
	}, []);

	const handleChange = e => {
		const name = e.target.name;
		let value = e.target.value;

		if (name === "hour") {
			value = checkValue(value, 0, 23);
		}

		if (name === "minute") {
			value = checkValue(value, 0, 59);
		}

		setSettings({
			...settings,
			[name]: value
		});
	}

	const checkValue = (value, min, max) => {
		let result = parseInt(value);
		result = Math.max(min, result);
		result = Math.min(max, result);
		if (isNaN(result)) {
			return min;
		}
		return result;
	}

	const addHours = (amount) => {
		const newValue = checkValue(hour + amount, 0, 23);
		setSettings({...settings, hour: newValue});
	};

	const addMinutes = (amount) => {
		const newValue = checkValue(minute + amount, 0, 59);
		setSettings({...settings, minute: newValue});
	};

	const handleSubmit = e => {
		e.preventDefault();

		// get date at midnight
		const midnight = new Date().setHours(0,0,0,0);

		// ms since midnight
		const elapsedSinceMidnight = new Date() - midnight;
		// ms to play the alarm since midnight
		const msToAlarm = hour * 3600000 + minute * 60000;

		const lastDate = elapsedSinceMidnight > msToAlarm ?
			midnight : midnight - 86400000;

		const newSettings = {
			...settings,
			lastDate: lastDate,
		}

		saveAlarm(newSettings);
		closeModal();
	}

	return (
		<form>
			<div className="input-row">
				<div className="input-container">
					<label htmlFor="title">Title</label>
					<div className="time-input-container">
						<input
							type="text"
							id="title"
							name="title"
							value={title}
							onChange={handleChange}
							ref={titleRef}
						/>
					</div>
				</div>
			</div>
			<div className="input-row">
				<div className="input-container">
					<label htmlFor="hour">Hours</label>
					<div className="time-input-container">
						<button type="button" onClick={() => addHours(1)}>
							<FaAngleUp/>
						</button>
						<input
							type="number"
							id="hour"
							className="time-input"
							name="hour"
							value={hour}
							onChange={handleChange}
						/>
						<button type="button" className="down" onClick={() => addHours(-1)}>
							<FaAngleUp/>
						</button>
					</div>
				</div>
				<div className="input-container">
					<label htmlFor="minute">Minutes</label>
					<div className="time-input-container">
						<button type="button" onClick={() => addMinutes(1)}>
							<FaAngleUp/>
						</button>
						<input
							type="number"
							id="minute"
							className="time-input"
							name="minute"
							value={minute}
							onChange={handleChange}
						/>
						<button type="button" className="down" onClick={() => addMinutes(-1)}>
							<FaAngleUp/>
						</button>
					</div>
				</div>
			</div>
			<div className="input-row">
				<div className="input-container">
					<label htmlFor="volume">Volume</label>
					<div className="time-input-container">
						<input
							type="range"
							min="0"
							max="1"
							step="0.01"
							id="volume"
							name="volume"
							value={volume}
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>
			<div className="input-row">
				<button type="submit" className="btn btn-green" onClick={handleSubmit}>
					Save
				</button>
			</div>
		</form>
	);
};

export default AlarmSettings;