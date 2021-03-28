import React, {useState} from "react";
import alarmSounds, {findSound} from "data/alarmSounds";
import {ImPlay3} from "react-icons/im";

const SoundInput = ({settings, handleChange}) => {
	const [audio] = useState(new Audio());

	const playSound = () => {
		audio.src = findSound(settings.soundId).url;
		audio.volume = settings.volume;
		audio.play();
	};

	return (
		<React.Fragment>
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
							value={settings.volume}
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default SoundInput;