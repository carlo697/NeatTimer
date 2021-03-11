import React from "react";
import {Link, useLocation} from "react-router-dom";
import { TiStopwatch } from "react-icons/ti";
import { GiStopwatch } from "react-icons/gi";

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
];

const Navbar = () => {
	const {pathname} = useLocation();

	return (
		<nav>
			{
				links.map((link, index) => {
					const {text, to, icon} = link;

					return (
						<Link
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