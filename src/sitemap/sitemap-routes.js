import React from 'react';
import { Route, Switch } from 'react-router';
 
export default (
	<Switch>
		<Route exact path="/"/>
		<Route path="/countdown"/>
		<Route path="/alarm"/>
		<Route path="/clock"/>
	</Switch>
)