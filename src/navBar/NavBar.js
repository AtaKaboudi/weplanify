import React from "react";
import ReactDOM from "react-dom/client";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
function NavBar() {
	const navigate = useNavigate();

	function rerouteNavigate() {
		navigate("/");
	}
	return (
		<div className="NavBar">
			<h1
				className="Logo"
				onClick={() => {
					rerouteNavigate();
				}}>
				WEPLANIFY
			</h1>

			<div className="routes">
				<label
					onClick={() => {
						navigate("/navigate");
					}}>
					EXPLORE
				</label>
				<label>ACCOUNT</label>
				<label>ABOUT US</label>
			</div>
		</div>
	);
}

export default NavBar;
