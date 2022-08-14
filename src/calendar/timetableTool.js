import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
const dayNames = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const monthNames = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

function generateTimesTableData(backendData) {
	const STARTING_HOURS = 8;
	const ENDING_HOURS = 24;
	const STEP = 1;
	const MAX_DAYS = 30;
	var weekDays = [];
	var dayTimes = [];
	var dayFrame = [];
	for (let j = STARTING_HOURS; j <= ENDING_HOURS; j += STEP) {
		dayFrame.push(j + ":00");
	}

	var currentDate = new Date();
	for (let i = 0; i <= MAX_DAYS; i++) {
		let day = currentDate.getDay();
		let date = currentDate.getDate();
		let month = currentDate.getMonth();
		let year = currentDate.getFullYear();
		weekDays.push({
			day: dayNames[day],
			date: date + " " + monthNames[month],
			year: year,
		});
		dayTimes.push(dayFrame);

		currentDate.setDate(currentDate.getDate() + 1);
	}

	backendData.forEach((d, i) => {
		let date = new Date(d.date);
		let searchKey = date.getDate() + " " + monthNames[date.getMonth() + 1];

		let index = weekDays.findIndex((v) => {
			return v.date == searchKey;
		});
		console.log(backendData);
		console.log(index);

		if (index !== -1) {
			dayTimes[index] = dayTimes[index].filter((e) => {
				return e !== d.time;
			});
		}
	});
	return {
		weekDays: weekDays,
		dayTimes: dayTimes,
	};
}

export default generateTimesTableData;
