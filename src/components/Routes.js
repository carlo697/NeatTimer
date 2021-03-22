import React from 'react';
import { Route, Switch } from 'react-router';
import Loading from "./Loading";

const Stopwatch = React.lazy(() => import("../pages/Stopwatch"));
const Countdown = React.lazy(() => import("../pages/Countdown"));
const Clock = React.lazy(() => import("../pages/Clock"));
const Alarm = React.lazy(() => import("../pages/Alarm"));
 
const Routes = () => {
	return (
		<React.Suspense fallback={<Loading/>}>
			<Switch>
				<Route exact path="/" component={Stopwatch}/>
				<Route path="/countdown" component={Countdown}/>
				<Route path="/alarm" component={Alarm}/>
				<Route path="/clock" component={Clock}/>
			</Switch>
		</React.Suspense>
	);
};

export default Routes;