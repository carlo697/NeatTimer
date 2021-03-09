import React from "react";
import {useGlobalContext} from "../context";
import {getTimeSpanStrings} from "../util.js";

const SplitsList = () => {
	const {splits} = useGlobalContext();

	if (splits.length === 0) {
		return null;
	}

	return (
		<section>
			<table>
				<thead>
					<tr>
						<th>Number</th>
						<th>Time</th>
						<th>Total Time</th>
					</tr>
				</thead>
				<tbody>
					{
						splits.map((item, index) => {
							const {number, time, totalTime} = item;
							const {hours, minutes, seconds} = getTimeSpanStrings(time);

							const {
								hours:totalHours,
								minutes:totalMinutes,
								seconds:totalSeconds
							} = getTimeSpanStrings(totalTime);

							return (
								<tr key={number}>
									<td>{number}</td>
									<td>{`${hours}:${minutes}:${seconds}`}</td>
									<td>{`${totalHours}:${totalMinutes}:${totalSeconds}`}</td>
								</tr>
							);
						})
					}
				</tbody>
			</table>	
		</section>
	);
};

export default SplitsList;