import React from "react";
import {getTimeSpanStrings} from "../util.js";
import {useGlobalContext} from "../context";
import {AiFillCloseCircle} from "react-icons/ai";

const SingleAlarm = ({id, title, hour, minute}) => {
	const {
		removeAlarm,
	} = useGlobalContext();

	const time = new Date(hour * 3600000 + minute * 60000);

	const {hours, minutes} = getTimeSpanStrings(time);

	return (
		<div className="alarm">
			<header>
				<h2>{title}</h2>
			</header>

			<div className="alarm-body">
				<div className="time">
					{
						`${hours}:${minutes}`
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