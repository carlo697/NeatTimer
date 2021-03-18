import React from "react";
import {Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import Stopwatch from "./pages/Stopwatch";
import Countdown from "./pages/Countdown";
import Clock from "./pages/Clock";
import Alarm from "./pages/Alarm";
import Footer from "./components/Footer";

const App = () => {
	return (
		<React.Fragment>
			<div className="page-container">
				<Navbar/>
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
				<Footer/>
			</div>
			<Modal/>
		</React.Fragment>
	);
};

export default App;