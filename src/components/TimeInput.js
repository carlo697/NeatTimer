import React from "react";
import { FaAngleUp } from 'react-icons/fa';
import {clampInt} from "../util";

const TimeInput = ({settings, setSettings, handleChange}) => {
	const {hours, seconds, minutes} = settings;

	const addHours = (amount) => {
		const newValue = clampInt(hours + amount, 0, 23);
		setSettings({...settings, hours: newValue});
	};

	const addMinutes = (amount) => {
		const newValue = clampInt(minutes + amount, 0, 59);
		setSettings({...settings, minutes: newValue});
	};

	const addSeconds = (amount) => {
		const newValue = clampInt(seconds + amount, 0, 60);
		setSettings({...settings, seconds: newValue});
	};

	return (
		<div className="input-row">
			<div className="input-container">
				<label htmlFor="hours">Hours</label>
				<div className="time-input-container">
					<button type="button" onClick={() => addHours(1)}>
						<FaAngleUp/>
					</button>
					<input
						type="number"
						id="hours"
						className="time-input"
						name="hours"
						value={settings.hours}
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
						value={settings.minutes}
						onChange={handleChange}
					/>
					<button type="button" className="down" onClick={() => addMinutes(-1)}>
						<FaAngleUp/>
					</button>
				</div>
			</div>
			{
				settings.seconds && (
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
								value={settings.seconds}
								onChange={handleChange}
							/>
							<button type="button" className="down" onClick={() => addSeconds(-1)}>
								<FaAngleUp/>
							</button>
						</div>
					</div>
				)
			}	
		</div>
	);
};

export default TimeInput;