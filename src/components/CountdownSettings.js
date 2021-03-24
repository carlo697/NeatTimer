import React, { useState } from "react";
import {useGlobalContext} from "../context";
import { FaAngleUp } from 'react-icons/fa';

const CountdownSettings = () => {
	const {
		countdownSettings,
		setCountdownSettings,
		closeModal,
		modal: {
			onSave
		}
	} = useGlobalContext();

	const [settings, setSettings] = useState({...countdownSettings});

	const handleSubmit = e => {
		e.preventDefault();

		setCountdownSettings({...settings});
		closeModal();
		onSave();
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

	const {title, hours, seconds, minutes, volume} = settings;

	const handleChange = e => {
		const name = e.target.name;
		let value = e.target.value;

		if (name === "hours") {
			value = checkValue(value, 0, 99);
		}

		if (name === "minutes") {
			value = checkValue(value, 0, 60);
		}

		if (name === "seconds") {
			value = checkValue(value, 0, 60);
		}

		setSettings({
			...settings,
			[name]: value
		});
	}

	const addHours = (amount) => {
		const newValue = checkValue(hours + amount, 0, 99);
		setSettings({...settings, hours: newValue});
	};

	const addMinutes = (amount) => {
		const newValue = checkValue(minutes + amount, 0, 60);
		setSettings({...settings, minutes: newValue});
	};

	const addSeconds = (amount) => {
		const newValue = checkValue(seconds + amount, 0, 60);
		setSettings({...settings, seconds: newValue});
	};

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
						/>
					</div>
				</div>
			</div>
			<div className="input-row">
				<div className="input-container">
					<label htmlFor="hours">Hours</label>
					<div className="time-input-container">
						<button type="button" onClick={() => addHours(1)}>
							<FaAngleUp/>
						</button>
						<input
							type="number"
							step="1"
							min="0"
							max="99"
							id="hours"
							className="time-input"
							name="hours"
							value={hours}
							onChange={handleChange}
						/>
						<button type="button" className="down" onClick={() => addHours(-1)}>
							<FaAngleUp/>
						</button>
					</div>
				</div>
				<div className="input-container">
					<label htmlFor="minutes">Minutes</label>
					<div className="time-input-container">
						<button type="button" onClick={() => addMinutes(1)}>
							<FaAngleUp/>
						</button>
						<input
							type="number"
							id="minutes"
							className="time-input"
							name="minutes"
							value={minutes}
							onChange={handleChange}
						/>
						<button type="button" className="down" onClick={() => addMinutes(-1)}>
							<FaAngleUp/>
						</button>
					</div>
				</div>
				<div className="input-container">
					<label htmlFor="seconds">Seconds</label>
					<div className="time-input-container">
						<button type="button" onClick={() => addSeconds(1)}>
							<FaAngleUp/>
						</button>
						<input
							type="number"
							id="seconds"
							className="time-input"
							name="seconds"
							value={seconds}
							onChange={handleChange}
						/>
						<button type="button" className="down" onClick={() => addSeconds(-1)}>
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
}

export default CountdownSettings;