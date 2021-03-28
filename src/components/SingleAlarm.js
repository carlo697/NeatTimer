import React from "react";
import {getTimeSpanStrings} from "utils";
import {useGlobalContext} from "context";
import {AiFillCloseCircle} from "react-icons/ai";

const SingleAlarm = ({id, title, hours, minutes}) => {
	const {
		removeAlarm,
	} = useGlobalContext();

	const time = new Date(hours * 3600000 + minutes * 60000);

	const {
		hours: formattedHours,
		minutes:formattedMinutes
	} = getTimeSpanStrings(time);

	return (
		<div className="alarm">
			<header>
				<h2>{title}</h2>
			</header>

			<div className="alarm-body">
				<div className="time">
					{
						`${formattedHours}:${formattedMinutes}`
					}
				</div>

				<div>
					<button className="" onClick={() => removeAlarm(id)}>
						<AiFillCloseCircle/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SingleAlarm;