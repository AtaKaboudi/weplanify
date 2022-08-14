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
						navigate("/navigate/0");
					}}>
					EXPLORE
				</label>
				<label
					onClick={() => {
						navigate("/partner");
					}}>
					PARTNER
				</label>
				<label
					onClick={() => {
						navigate("/login");
					}}>
					LOGIN
				</label>
			</div>
		</div>
	);
}

export default NavBar;
