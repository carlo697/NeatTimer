import React from "react";
import ReactDom from "react-dom";
import "index.css";
import App from "App";
import {AppProvider} from "context";
import {BrowserRouter as Router} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";

ReactDom.render(
	<React.StrictMode>
		<AppProvider>
			<Router>
				<HelmetProvider>
					<App/>
				</HelmetProvider>
			</Router>
		</AppProvider>
	</React.StrictMode>,
	document.getElementById("root")
);