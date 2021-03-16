import React from "react";
import {Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import Stopwatch from "./pages/Stopwatch";
import Countdown from "./pages/Countdown";
import Clock from "./pages/Clock";

const App = () => {
	return (
		<React.Fragment>
			<Navbar/>
			<Switch>
				<Route exact path="/">
					<Stopwatch/>
				</Route>
				<Route path="/countdown">
					<Countdown/>
				</Route>
				<Route path="/clock">
					<Clock/>
				</Route>
			</Switch>
			<Modal/>
		</React.Fragment>
	);
};

export default App;