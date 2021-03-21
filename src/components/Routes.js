import React from 'react';
import { Route, Switch } from 'react-router';
import Stopwatch from "../pages/Stopwatch";
import Countdown from "../pages/Countdown";
import Clock from "../pages/Clock";
import Alarm from "../pages/Alarm";
 
const Routes = () => {
	return (
		<Switch>
			<Route exact path="/">
				<Stopwatch/>
			</Route>
			<Route path="/countdown">
				<Countdown/>
			</Route>
			<Route path="/alarm">
				<Alarm/>
			</Route>
			<Route path="/clock">
				<Clock/>
			</Route>
		</Switch>
	);
};

export default Routes;