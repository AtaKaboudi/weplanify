import NavBar from "../navBar/NavBar";
import "./main.css";
import { useNavigate } from "react-router-dom";
const Main = () => {
	let navigate = useNavigate();
	return (
		<div className="pageWrapper">
			<NavBar />
			<div className="imgWrapper">
				<label className="logo">WePlanify</label>
				<h1>Connecting you with the best service providers in Town</h1>
				<button
					onClick={() => {
						navigate("/navigate");
					}}>
					Explore
					<span class="material-symbols-outlined">chevron_right</span>
				</button>
			</div>
		</div>
	);
};

export default Main;
