import React, {useRef, useEffect} from "react";

const TitleInput = ({settings, handleChange}) => {
	const titleRef = useRef(null);

	useEffect(() => {
		titleRef.current.focus();
	}, []);

	return (
		<div className="input-row">
			<div className="input-container">
				<label htmlFor="title">Title</label>
				<div className="time-input-container">
					<input
						type="text"
						id="title"
						name="title"
						value={settings.title}
						onChange={handleChange}
						ref={titleRef}
					/>
				</div>
			</div>
		</div>
	);
};

export default TitleInput;