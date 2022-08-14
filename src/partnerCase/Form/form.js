import "./form.css";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import ImageUpload from "./imageUpload/imageUpload";
import PartnerNavBar from "../partnerNavBar/partnerNavBar";
import ServiceUpload from "./servicesUpload/servicesUpload";
function PartnerPage() {
	var { partnerId } = useParams();

	var [params, setParams] = useState({});

	const partnerRef = doc(db, "partner", partnerId);

	async function getData() {
		return await getDoc(partnerRef);
	}

	useEffect(() => {
		getData().then((doc) => {
			setParams({ ...doc.data(), id: doc.id });
		});
		console.log(params);
	}, []);
	var [modify, setModify] = useState(false);

	function convertTime12To24(time) {
		var hours = Number(time.match(/^(\d+)/)[1]);
		var minutes = Number(time.match(/:(\d+)/)[1]);
		var AMPM = time.match(/\s(.*)$/)[1];
		if (AMPM === "PM" && hours < 12) hours = hours + 12;
		if (AMPM === "AM" && hours === 12) hours = hours - 12;
		var sHours = hours.toString();
		var sMinutes = minutes.toString();
		if (hours < 10) sHours = "0" + sHours;
		if (minutes < 10) sMinutes = "0" + sMinutes;
		return sHours + ":" + sMinutes;
	}
	function convertTime24To12(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? "0" + minutes : minutes;
		var strTime = hours + ":" + minutes + " " + ampm;
		return strTime;
	}

	function locationExtraction(url) {
		var regex = new RegExp("@(.*),(.*),");
		var lat_long_match = url.match(regex);
		var lat = lat_long_match[1];
		var long = lat_long_match[2];
		return {
			long: lat,
			lat: long,
		};
	}

	function getColor(s) {
		if ((s = "submitted")) return "grey";
		if ((s = "approved")) return "green";
		if ((s = "denied")) return "red";
	}
	async function updateData() {
		console.log(params);
		const appoirmentRef = doc(db, "partner", partnerId);
		for (const obj in params) {
			if (params[obj] === "") {
				params[obj] = "Unspecified";
			}
			if (params[obj] === null) {
				params[obj] = "";
			}
		}
		try {
			await updateDoc(appoirmentRef, params);
		} catch (err) {
			alert(err);
		}
	}

	return (
		<div className="formPageWrapper">
			<PartnerNavBar />
			<form className="formWrapper">
				<div className="column">
					<div className="itemWrapper">
						<label>Company Name</label>
						{modify ? (
							<input
								placeholder="Company Name"
								type="text"
								onChange={(event) => {
									setParams({ ...params, company_name: event.target.value });
								}}
							/>
						) : (
							<label>{params.company_name}</label>
						)}
					</div>

					<div className="itemWrapper">
						<label>Category</label>
						{modify ? (
							<input
								placeholder="Category"
								type="text"
								onChange={(event) => {
									setParams({ ...params, category: event.target.value });
								}}
							/>
						) : (
							<label>{params.category}</label>
						)}{" "}
					</div>
					<div className="itemWrapper">
						<label>City</label>
						{modify ? (
							<input
								placeholder="City"
								type="text"
								onChange={(event) => {
									setParams({ ...params, city: event.target.value });
								}}
							/>
						) : (
							<label>{params.city}</label>
						)}{" "}
					</div>
					<div className="itemWrapper">
						<label>Closing_hours</label>
						{modify ? (
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<TimePicker
									onChange={(newValue) => {
										setParams({
											...params,
											closing_hour: convertTime12To24(
												newValue.toLocaleTimeString()
											),
										});
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						) : (
							<label>{params.closing_hour}</label>
						)}{" "}
					</div>
					<div className="itemWrapper">
						<label>Opening hours</label>
						{modify ? (
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<TimePicker
									onChange={(newValue) => {
										setParams({
											...params,
											opening_hour: convertTime12To24(
												newValue.toLocaleTimeString()
											),
										});
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						) : (
							<label>{params.opening_hour}</label>
						)}{" "}
					</div>
				</div>

				<div className="column">
					<div className="itemWrapper">
						<label>Description</label>
						{modify ? (
							<textarea
								placeholder="Description"
								type="text"
								onChange={(event) => {
									setParams({ ...params, description: event.target.value });
								}}
							/>
						) : (
							<p>{params.description}</p>
						)}{" "}
					</div>

					<div className="itemWrapper">
						<label>Owner_name</label>
						{modify ? (
							<input
								placeholder="Owner Name"
								type="text"
								onChange={(event) => {
									setParams({ ...params, owner_name: event.target.value });
								}}
							/>
						) : (
							<label>{params.owner_name}</label>
						)}{" "}
					</div>
					<div className="itemWrapper">
						<label>Paiement Method</label>
						{modify ? (
							<input
								placeholder="Paiement Method"
								type="text"
								onChange={(event) => {
									setParams({
										...params,
										paiement_method: event.target.value,
									});
								}}
							/>
						) : (
							<label>{params.paiement_method}</label>
						)}{" "}
					</div>
				</div>
				{!modify ? (
					<span
						class="material-symbols-outlined"
						onClick={() => {
							setModify(!modify);
						}}>
						edit
					</span>
				) : (
					<span
						class="material-symbols-outlined"
						onClick={() => {
							updateData();
							setModify(!modify);
						}}>
						check
					</span>
				)}
			</form>

			<form className="locationFormWrapper">
				<div className="itemWrapper">
					{!modify ? (
						<span
							class="material-symbols-outlined"
							onClick={() => {
								setModify(!modify);
							}}>
							edit
						</span>
					) : (
						<span
							class="material-symbols-outlined"
							onClick={() => {
								updateData();
								setModify(!modify);
							}}>
							check
						</span>
					)}
					<label>Location</label>
					{modify ? (
						<input
							placeholder="Google Maps URL"
							type="text"
							onChange={(event) => {
								let { lat, long } = locationExtraction(event.target.value);
								setParams({ ...params, latitude: lat, longitude: long });
							}}
						/>
					) : (
						<div className="longLatContainers">
							<label>Longitude</label>
							<label>{params.longitude}</label>
							<div>
								<label>latitude</label>
								<label>{params.latitude}</label>
							</div>
						</div>
					)}{" "}
				</div>

				<ImageUpload params={params.img} />
			</form>
			<ServiceUpload />
			<div className="partnerFormDtatusWrapper">
				{params.status == "initiated" ? (
					<button>Submit for approval</button>
				) : (
					""
				)}
				{params.status !== "initiated" ? (
					<div>
						<label>Status </label>
						<h3 style={{ color: getColor(params.status) }}>{params.status} </h3>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default PartnerPage;
