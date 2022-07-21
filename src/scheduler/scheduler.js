import { useEffect, useState } from "react";
import "./scheduler.css";
import {
	EditingState,
	IntegratedEditing,
	ViewState,
} from "@devexpress/dx-react-scheduler";
import {
	AppointmentForm,
	Appointments,
	WeekView,
	Scheduler,
	MonthView,
} from "@devexpress/dx-react-scheduler-material-ui";

function AppoitmentScheduler(props) {
	var data = [
		{
			startdate: "2022-08-22T09:45",
			endate: "2022-08-22T10:11",
			title: "Meeting",
		},
	];
	return (
		<div>
			<h3>Reserve an apointment</h3>
			<Scheduler data={data}>
				<ViewState />
				<EditingState />
				<IntegratedEditing />
				<MonthView startdate={new Date()} />
				<Appointments />
			</Scheduler>
		</div>
	);
}

export default AppoitmentScheduler;
