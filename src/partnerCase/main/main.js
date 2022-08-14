import PartnerNavBar from "../partnerNavBar/partnerNavBar";
import "./main.css";
import { ReportCard } from "../stats/stats";
import AppoitmentRequests from "./appoitmentRequests/appoitmentRequests";
function PartnerMain() {
	var stats = [
		{
			label: "Access a day",
			value: 100,
			icon: "login",
			color: "#4099FE",
		},
		{
			label: "Appoitments a day",
			value: 3,
			icon: "groups",
			color: "#2ED8B6",
		},
		{
			label: "Appoint per view",
			value: 0.3,
			icon: "key",
			color: "#FFC107",
		},
	];
	return (
		<div className="mainPageWrapper">
			<PartnerNavBar />
			<div className="mainMessageContainer">
				<h1> Welcome Back Ata</h1>
				<h3 className="generalAnalyticsLabel">General Analytics</h3>
				<div className="reportCardsContainer">
					{stats.map((s) => {
						return <ReportCard params={s} />;
					})}
				</div>
				<AppoitmentRequests />
			</div>
		</div>
	);
}

export default PartnerMain;
