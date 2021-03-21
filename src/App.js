import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./components/Routes";
import Modal from "./components/Modal";
import Footer from "./components/Footer";

const App = () => {
	return (
		<React.Fragment>
			<div className="page-container">
				<Navbar/>
				<Routes/>
				<Footer/>
			</div>
			<Modal/>
		</React.Fragment>
	);
};

export default App;