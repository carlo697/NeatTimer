import React, { useState } from "react";
import {useGlobalContext} from "../context";
import { FaAngleUp } from 'react-icons/fa';

const CountdownSettings = () => {
	const {
		countdownSettings,
		setCountdownSettings,
		closeModal,
	} = useGlobalContext();

	const [settings, setSettings] = useState({...countdownSettings});

	const handleSubmit = e => {
		e.preventDefault();

		setCountdownSettings({...settings});
		closeModal();
	}

	const handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;

		setSettings({
			...settings,
			[name]: value
		});
	}

	const {hours, seconds, minutes} = settings;

	return (
		<form>
			<div className="input-row">
				<div className="input-container">
					<label htmlFor="hours">Hours</label>
					<div className="time-input-container">
						<button type="button">
							<FaAngleUp/>
						</button>
						<input
							type="number"
							id="hours"
							className="time-input"
							name="hours"
							value={hours}
							onChange={handleChange}
						/>
						<button type="button" className="down">
							<FaAngleUp/>
						</button>
					</div>
				</div>
				<div className="input-container">
					<label htmlFor="minutes">Minutes</label>
					<div className="time-input-container">
						<button type="button">
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
						<button type="button" className="down">
							<FaAngleUp/>
						</button>
					</div>
				</div>
				<div className="input-container">
					<label htmlFor="seconds">Seconds</label>
					<div className="time-input-container">
						<button type="button">
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
						<button type="button" className="down">
							<FaAngleUp/>
						</button>
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