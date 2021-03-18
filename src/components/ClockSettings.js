import React, {useState} from "react";
import {useGlobalContext} from "../context";

const ClockSettings = () => {
	const {
		clockSettings,
		setClockSettings,
		closeModal,
	} = useGlobalContext();

	const [settings, setSettings] = useState({...clockSettings});

	const handleSubmit = e => {
		e.preventDefault();

		setClockSettings({...settings});
		closeModal();
	}

	const handleChange = e => {
		const {target} = e;

		const name = target.name;
		const value = target.type === 'checkbox' ? target.checked : target.value;

		setSettings({
			...settings,
			[name]: value
		});
	}

	return (
		<form>
			<div className="input-row">
					<label htmlFor="useAPI">Get time online</label>
						<input
							type="checkbox"
							id="useAPI"
							name="useAPI"
							checked={settings.useAPI}
							onChange={handleChange}
						/>
			</div>

			<div className="input-row">
				<button type="submit" className="btn btn-green" onClick={handleSubmit}>
					Save
				</button>
			</div>
		</form>
	);
}

export default ClockSettings;