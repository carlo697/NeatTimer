import {useRef, useEffect} from "react";

function formatZero(text) {
	text = text.toString();

	if (text.length < 2) {
		return "0" + text;
	}

	return text;
}

export function getTimeSpanStrings(miliseconds) {
	
	let hours = Math.floor(miliseconds / 3600000);
	hours = hours.length < 2 ? "00" : hours;
	miliseconds -= hours * 3600000;

	const minutes = Math.floor(miliseconds / 60000)
	miliseconds -= minutes * 60000;

	const seconds = Math.floor(miliseconds / 1000);
	miliseconds -= seconds * 1000;

	const centiseconds = Math.floor(miliseconds / 10);
	const _mili = Math.floor(miliseconds);

	return {
		miliseconds: formatZero(_mili),
		centiseconds: formatZero(centiseconds),
		seconds: formatZero(seconds),
		minutes: formatZero(minutes),
		hours: formatZero(hours)
	};
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}