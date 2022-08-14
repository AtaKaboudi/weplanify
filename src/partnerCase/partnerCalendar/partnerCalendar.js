import {
	ViewState,
	EditingState,
	IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
	Scheduler,
	WeekView,
	Appointments,
	AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useEffect, useState } from "react";
import "./partnerCalendar.css";
import calendarContent from "./timetableTools";
import PartnerNavBar from "../partnerNavBar/partnerNavBar";
import { useSearchParams } from "react-router-dom";

import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
function PartnerCalendar(props) {
	var nbDays = props.nbDays ? props.nbDays : 7;
	var displayOnly = props.displayOnly;
	var calendarWidth = props.calendarWidth ? props.calendarWidth : 90 + "vw";

	const { partnerId } = useParams();

	let userId = "a";
	//var { weekDays, dayTimes } = calendarContent();
	var [weekDays, setWeekDays] = useState([]);
	var [dayTimes, setDayTimes] = useState([]);
	var [dateStart, setDateStart] = useState(0);
	const appoitmentRef = collection(db, "appoitment");
	var q = query(appoitmentRef, where("partner_id", "==", partnerId));

	async function getData() {
		await getDocs(q).then((snapshot) => {
			let p = [];
			snapshot.forEach((s) => {
				p.push({ ...s.data(), id: s.id });
			});
			console.log(p);
			let aux = calendarContent(p, nbDays);
			console.log(aux);
			weekDays = setWeekDays(aux.weekDays);
			dayTimes = setDayTimes(aux.dayTimes);
		});
	}

	useEffect(() => {
		console.log("reload");
		getData();
	}, []);
	function color(s) {
		console.log(s);
		if (s == "pending") return "#BFBFBF";
		if (s == "accepted") return "#689F39";
		if (s == "denied") return "#CC0000";
	}
	function formatDateInput(e) {
		let aux = weekDays.slice(dateStart, dateStart + nbDays)[e.target.id];
		let date = aux.date.split(" ")[0];
		let monthName = aux.date.split(" ")[1];
		let monthNumber =
			new Date(Date.parse(monthName + " 1, 2012")).getMonth() + 1;
		let year = aux.year;
		let time = e.target.innerHTML;
		let dbFormat = year + "-" + monthNumber + "-" + date;
		aux.dbFormat = dbFormat;
		aux.time = time;
		return {
			dbFormat: dbFormat,
			time: time,
		};
	}

	return (
		<a className="partnerCalendarPageWrapper">
			<PartnerNavBar />
			<div className="pCalendarWrapper" style={{ width: calendarWidth }}>
				<div className="pcolumn" style={{ alignItems: "left", padding: "0" }}>
					{dateStart > nbDays - 1 ? (
						<span
							class="material-symbols-outlined"
							style={{ cursor: "pointer" }}
							onClick={() => {
								setDateStart(dateStart - nbDays);
							}}>
							chevron_left
						</span>
					) : (
						""
					)}
				</div>
				{weekDays.slice(dateStart, dateStart + nbDays).map((d, i) => {
					return (
						<div className="pcolumn" style={{ width: 100 / nbDays - 5 + "%" }}>
							<div className="pdateDayTitle">
								<h3>{d.day}</h3>
								<label>{d.date}</label>
							</div>
							<div className="pdayTableContainer">
								{dayTimes[dateStart + i] &&
								dayTimes[dateStart + i].length != 0 ? (
									dayTimes[dateStart + i].map((s) => {
										return (
											<div
												className="pavailbleTime"
												id={i}
												style={{ backgroundColor: color(s.status) }}
												onClick={(e) => {}}>
												{s.time}
											</div>
										);
									})
								) : (
									<label>None</label>
								)}
							</div>
						</div>
					);
				})}
				<div className="pcolumn" style={{ alignItems: "left", padding: "0" }}>
					{dateStart < weekDays.length - nbDays ? (
						<h3
							style={{ cursor: "pointer" }}
							onClick={() => {
								setDateStart(dateStart + nbDays);
							}}>
							<span class="material-symbols-outlined">chevron_right</span>
						</h3>
					) : (
						""
					)}
				</div>
			</div>
		</a>
	);
}

export default PartnerCalendar;
