import React from "react";
import {Link, useLocation} from "react-router-dom";
import { TiStopwatch } from "react-icons/ti";
import { GiStopwatch, GiAlarmClock } from "react-icons/gi";
import { IoIosClock } from "react-icons/io";

const links = [
	{
		text: "Stopwatch",
		to: "/",
		icon: <TiStopwatch/>,
	},
	{
		text: "Countdown",
		to: "/countdown",
		icon: <GiStopwatch/>,
	},
	{
		text: "Alarm",
		to: "/alarm",
		icon: <GiAlarmClock/>,
	},
	{
		text: "Clock",
		to: "/clock",
		icon: <IoIosClock/>,
	},
];

const Navbar = () => {
	const {pathname} = useLocation();

	return (
		<nav>
			<h2 className="nav-logo">
				<Link to="/">
					<span className="logo-neat">Neat </span>
					<span className="logo-timer">Timer</span>
				</Link>
			</h2>

			{
				links.map((link, index) => {
					const {text, to, icon} = link;

					return (
						<Link
							key={index}
							to={to}
							className={"nav-link " + (pathname === to ? "selected" : "")}
						>
							<span className="nav-icon">{icon}</span> 
							<span className="nav-text">{text}</span>
						</Link>
					);
				})
			}
		</nav>
	);
};

export default Navbar;