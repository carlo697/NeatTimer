import React from "react";
import {useInterval, useLocalStorage, getTimeSpanStrings} from "utils";
import {useGlobalContext} from "context";
import {ImPause2, ImPlay3} from "react-icons/im";
import {VscDebugRestart} from "react-icons/vsc";

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
			<div className="timer">
				{
					`${hours}:${minutes}:${seconds}`
				}
				<span className="centiseconds">
					{
						`.${centiseconds}`
					}
				</span>
			</div>

			<div className="btn-container">
				{
					isOn ?
							<React.Fragment>
								<button onClick={() => addSplit(time)} className="btn btn-purple">
									Split
								</button>
								<button onClick={stop} className="btn small btn-red">
									<ImPause2 className="icon"/>
								</button>
							</React.Fragment>
						:
							<React.Fragment>
								<button onClick={restart} className="btn simple btn-red" disabled={time === 0}>
									<VscDebugRestart className="icon"/>
								</button>
								<button onClick={start} className="btn small btn-green">
									<ImPlay3 className="icon"/>
								</button>
							</React.Fragment>
				}
			</div>
		</section>
	);
};

export default StopwatchTime;