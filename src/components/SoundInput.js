import React, {useState} from "react";
import alarmSounds, {findSound} from "../data/alarmSounds";
import {ImPlay3} from "react-icons/im";

const SoundInput = ({settings, handleChange}) => {
	const [audio] = useState(new Audio());

	const playSound = () => {
		audio.src = findSound(settings.soundId).url;
		audio.volume = settings.volume;
		audio.play();
	};

	return (
		<div className="input-row">
			<div className="input-container">
				<label htmlFor="soundId">Sound</label>
				<div className="input-btn-row">
					<select
						id="soundId"
						name="soundId"
						value={settings.soundId}
						onChange={handleChange}
					>
						{
							alarmSounds.map(sound => {
								const {id, name} = sound;
								return (
									<option
										key={id}
										value={id}
									>
										{name}
									</option>
								);
							})
						}
					</select>
					<button
						type="button"
						onClick={playSound}
						className="btn small btn-blue"
					>
						<ImPlay3 className="icon"/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SoundInput;