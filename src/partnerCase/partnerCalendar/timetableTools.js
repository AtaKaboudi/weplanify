import { db } from "../../firebase";
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

function generateTimesTableData(backendData, nbDays) {
	const STARTING_HOURS = 8;
	const ENDING_HOURS = 24;
	const STEP = 1;
	const MAX_DAYS = 30;
	var weekDays = [];
	var dayTimes = [];
	for (let i = 0; i < nbDays; i++) {
		dayTimes.push([]);
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

		currentDate.setDate(currentDate.getDate() + 1);
	}

	console.log(backendData);
	backendData.forEach((d, i) => {
		let dateObject = new Date(d.date);
		let day = dateObject.getDay();
		let date = dateObject.getDate();
		let month = dateObject.getMonth();
		let year = dateObject.getFullYear();

		let searchKey =
			dateObject.getDate() + " " + monthNames[dateObject.getMonth() + 1];
		let index = weekDays.findIndex((v) => v.date == searchKey);
		console.log(searchKey);
		if (index !== -1) {
			dayTimes[index].push({ time: d.time, status: d.status });
		}
	});

	return {
		weekDays: weekDays,
		dayTimes: dayTimes,
	};
}

export default generateTimesTableData;
