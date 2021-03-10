import React, {useState} from "react";
import {useInterval, useLocalStorage, getTimeSpanStrings} from "../util.js";
import {useGlobalContext} from "../context";

const StopwatchTime = () => {
	const {addSplit, clearSplits} = useGlobalContext();

	const [startTime, setStartTime] = useLocalStorage("stopwatchStartTime", 0);
	const [isOn, setIsOn] = useLocalStorage("isStopwatchOn", false);
	const [time, setTime] = useLocalStorage("stopwatchTime", 0);

	useInterval(() => {
		const elapsedMiliseconds = Date.now() - startTime;
		const newTime = new Date(elapsedMiliseconds);

		setTime(newTime.getTime());

	}, isOn ? 50 : null);

	const start = () => {
		setIsOn(true);
		setStartTime(Date.now() - time);
	};

	const stop = () => {
		setIsOn(false);
	};

	const restart = () => {
		setTime(0);
		clearSplits();
	};

	const {hours, minutes, seconds, centiseconds} = getTimeSpanStrings(time);

	return (
		<section>
			<div>
				{
					`${hours}:${minutes}:${seconds}`
				}
				<span>
					{
						`.${centiseconds}`
					}
				</span>
			</div>

			{
				isOn ?
						<React.Fragment>
							<button onClick={() => addSplit(time)}>
								Split
							</button>
							<button onClick={stop}>
								Stop
							</button>
						</React.Fragment>
					:
						<React.Fragment>
							<button onClick={restart}>
								Restart
							</button>
							<button onClick={start}>
								Start
							</button>
						</React.Fragment>
			}
		</section>
	);
};

export default StopwatchTime;