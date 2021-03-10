import {useRef, useState, useEffect} from "react";

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

// Hook extracted from https://usehooks.com/useLocalStorage/
export function useLocalStorage(key, initialValue) {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState(() => {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			// If error also return initialValue
			console.log(error);
			return initialValue;
		}
	});

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = value => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore =
			value instanceof Function ? value(storedValue) : value;
			// Save state
			setStoredValue(valueToStore);
			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error);
		}
	};

	return [storedValue, setValue];
}