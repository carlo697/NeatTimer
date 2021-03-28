import React, {useState} from "react";
import {useGlobalContext} from "context";
import TitleInput from "./TitleInput";
import TimeInput from "./TimeInput";
import SoundInput from "./SoundInput";
import {clampInt} from "utils";

const SettingsModal = ({oldSettings, saveSettings, beforeSave}) => {
	const {
		closeModal,
		modal: {
			onSave
		}
	} = useGlobalContext();

	const [settings, setSettings] = useState(oldSettings);

	const handleChange = e => {
		const name = e.target.name;
		let value = e.target.value;

		if (name === "hours") {
			value = clampInt(value, 0, 23);
		}

		if (name === "minutes") {
			value = clampInt(value, 0, 59);
		}

		if (name === "seconds") {
			value = clampInt(value, 0, 59);
		}

		setSettings({
			...settings,
			[name]: value
		});
	}

	const handleSubmit = e => {
		e.preventDefault();

		const newSettings = beforeSave ? beforeSave(settings) : settings;

		saveSettings(newSettings);
		closeModal();

		if (onSave) {
			onSave();
		}
	}

	return (
		<form>
			<TitleInput settings={settings} handleChange={handleChange}/>
			<TimeInput
				settings={settings}
				setSettings={setSettings}
				handleChange={handleChange}
			/>
			<SoundInput settings={settings} handleChange={handleChange}/>
			<footer>
				<button type="submit" className="btn btn-green" onClick={handleSubmit}>
					Save
				</button>
			</footer>
		</form>
	);
};

export default SettingsModal;