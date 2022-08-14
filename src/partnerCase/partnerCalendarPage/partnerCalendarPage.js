import PartnerCalendar from "../partnerCalendar/partnerCalendar";
import "./partnerCalendarPage.css";
function PartnerCalendarPage() {
	return (
		<div>
			<PartnerCalendar />
			<div className="partnerCalendarButtonsContainer">
				<button>
					<span style={{ color: "green" }} class="material-symbols-outlined">
						add
					</span>
				</button>
				<button>
					<span style={{ color: "red" }} class="material-symbols-outlined">
						remove
					</span>
				</button>
			</div>
		</div>
	);
}
export default PartnerCalendarPage;
