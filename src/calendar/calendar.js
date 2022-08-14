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
import "./calendar.css";
import calendarContent from "./timetableTool";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
function Calendar(props) {
	var nbDays = props.nbDays ? props.nbDays : 7;
	var displayOnly = props.displayOnly;
	var calendarWidth = props.calendarWidth ? props.calendarWidth : 99 + "vw";
	var service = props.service ? props.service : "Not specified";
	var timeSlotsNumberLimit = props.timeSlotsNumberLimit || 100;
	var productId = props.productId;

	let userId = "a";
	//var { weekDays, dayTimes } = calendarContent();
	var [weekDays, setWeekDays] = useState([]);
	var [dayTimes, setDayTimes] = useState([]);
	var [dateStart, setDateStart] = useState(0);
	var [selectDate, setSelectDate] = useState({});
	var [confirmedReservation, setConfirmedResrvation] = useState(false);
	const appoitmentRef = collection(db, "appoitment");
	var q = query(appoitmentRef, where("partner_id", "==", productId));

	async function getData() {
		await getDocs(q).then((snapshot) => {
			let p = [];
			snapshot.forEach((s) => {
				p.push({ ...s.data(), id: s.id });
			});
			console.log(p);
			let aux = calendarContent(p);
			weekDays = setWeekDays(aux.weekDays);
			dayTimes = setDayTimes(aux.dayTimes);
		});
	}

	useEffect(() => {
		console.log("reload");
		getData();
	}, []);

	function formatDateInput(e) {
		let aux = weekDays.slice(dateStart, dateStart + nbDays)[e.target.id];
		let date = aux.date.split(" ")[0];
		let monthName = aux.date.split(" ")[1];
		let monthNumber = new Date(Date.parse(monthName + " 1, 2012")).getMonth();
		let year = aux.year;
		let time = e.target.innerHTML;
		let dbFormat = year + "-" + monthNumber + "-" + date;
		aux.dbFormat = dbFormat;
		aux.time = time;
		return {
			dbFormat: dbFormat,
			time: time,
		};
		window.scrollBy(0, 500);
	}
	async function postReservation() {
		await addDoc(collection(db, "appoitment"), {
			user_id: userId,
			date: selectDate.dbFormat,
			time: selectDate.time,
			partner_id: productId,
			service: service,
			status: "pending",
		})
			.catch((e) => {
				console.log(e);
			})
			.then((r) => {
				setConfirmedResrvation(true);
			});
	}
	function userDatetoDbDate() {
		// change
	}
	return (
		<a>
			<div className="uCalendarWrapper" style={{ width: calendarWidth }}>
				<div className="ucolumn" style={{ alignItems: "left", padding: "0" }}>
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
						<div className="ucolumn" style={{ width: 100 / nbDays - 5 + "%" }}>
							<div className="udateDayTitle">
								<h3>{d.day}</h3>
								<label>{d.date}</label>
							</div>
							<div className="udayTableContainer">
								{dayTimes[dateStart + i].map((s, index) => {
									if (index < timeSlotsNumberLimit) {
										return (
											<div
												className="uavailbleTime"
												id={i}
												onClick={(e) => {
													console.log(props);
													if (displayOnly) return;
													setSelectDate(formatDateInput(e));
												}}>
												{s}
											</div>
										);
									}
									return "";
								})}
							</div>
						</div>
					);
				})}
				<div className="ucolumn" style={{ alignItems: "left", padding: "0" }}>
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
			{selectDate.dbFormat ? (
				<div className="uconfirmationWrapper">
					<h3>Selected Date</h3>
					<h3> {selectDate.dbFormat + " at :" + selectDate.time} </h3>
					<div>
						{confirmedReservation ? (
							<h3>Your reservation is Confirmed </h3>
						) : (
							<button
								onClick={() => {
									postReservation();
								}}>
								Confirm
							</button>
						)}
					</div>
				</div>
			) : (
				""
			)}
		</a>
	);
}

export default Calendar;
