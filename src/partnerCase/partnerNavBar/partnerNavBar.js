import "./partnerNavBar.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function PartnerNavBar() {
	let navigate = useNavigate();
	const { partnerId } = useParams();
	console.log(partnerId);
	return (
		<div className="navBarContainer">
			<div
				className="buttonContainer"
				onClick={() => {
					navigate("/partner/" + partnerId);
				}}>
				<span class="material-symbols-outlined">home</span> <label>Main</label>
			</div>
			<div
				className="buttonContainer"
				onClick={() => {
					navigate("/partner/information/" + partnerId);
				}}>
				<span class="material-symbols-outlined">info</span>
				<label>Information</label>
			</div>
			<div
				className="buttonContainer"
				onClick={() => {
					navigate("/partner/Calendar/" + partnerId);
				}}>
				<span class="material-symbols-outlined">calendar_month</span>
				<label>Calendar</label>
			</div>
		</div>
	);
}

export default PartnerNavBar;
