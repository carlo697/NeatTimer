import React from "react";
import {IoIosArrowForward} from "react-icons/io";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-links">
				<a href="https://github.com/carlo697/NeatTimer">
					<IoIosArrowForward className="icon"/>
					Source Code
				</a>
			</div>
			<p>NeatTimer {new Date().getFullYear()}</p>
		</footer>
	);
};

export default Footer;