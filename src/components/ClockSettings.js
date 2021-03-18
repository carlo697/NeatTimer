import React, {useState} from "react";
import {useGlobalContext} from "../context";

const ClockSettings = () => {
	const {
		clockSettings,
		setClockSettings,
		closeModal,
		modalExtra: {onSave},
	} = useGlobalContext();

	const [settings, setSettings] = useState({...clockSettings});

	const handleSubmit = e => {
		e.preventDefault();

		setClockSettings({...settings});
		closeModal();
		onSave();
	}

	const handleChange = e => {
		const name = e.target.name;
		let value = e.target.value;

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
							value={settings.useAPI}
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