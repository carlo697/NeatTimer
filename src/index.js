import React from "react";
import ReactDom from "react-dom";
import "./index.css";
import App from "./App";
import {AppProvider} from "./context"


ReactDom.render(
	<React.StrictMode>
		<AppProvider>
			<App/>
		</AppProvider>
	</React.StrictMode>,
	document.getElementById("root")
);