import "./servicesUpload.css";
import { useState, useEffect } from "react";
import {
	collection,
	doc,
	getDocs,
	query,
	where,
	setDoc,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useParams } from "react-router-dom";

function ServiceUpload() {
	var { partnerId } = useParams();
	var [addServiceView, setAddServiceView] = useState(false);
	var [params, setParams] = useState([]);
	const ref = collection(db, "service");

	async function getData(q) {
		await getDocs(q).then((snapshot) => {
			let p = [];
			snapshot.forEach((s) => {
				p.push({ ...s.data(), id: s.id });
			});
			setParams(p);
			console.log(p);
		});
	}
	var [newService, setNewService] = useState([]);
	async function postData() {
		const servicesRef = doc(db, "service");
		for (const obj in params) {
		}
		try {
			await setDoc(servicesRef, params);
		} catch (err) {
			alert(err);
		}
	}
	async function postNewService(newService) {
		const servicesRef = doc(collection(db, "service"));

		try {
			await setDoc(servicesRef, newService);
		} catch (err) {
			alert(err);
		} finally {
			setParams([...params, newService]);
		}
	}
	async function deleteService(id) {
		const servicesRef = doc(db, "service", id);
		try {
			await deleteDoc(servicesRef);
		} catch (err) {
			console.log(err);
		}
		setParams(params.filter((item) => item.id !== id));
	}

	useEffect(() => {
		let q = query(ref, where("partner_id", "==", partnerId));
		getData(q);
	}, []);
	return (
		<div className="pserviceUploadWrapper">
			<h3 className="title">Services</h3>

			{params.length != 0 ? (
				<div className="pServicesListWrapper">
					<div className="infoBar">
						<h2>Name</h2>
						<h3>Price </h3>
						<h3>Time</h3>
						<span class="material-symbols-outlined">remove</span>
					</div>
					{params.map((p) => {
						return (
							<div className="pserviceWrapper" onClick={() => {}}>
								<h2>{p.service_name}</h2>
								<h3>{p.price} dt</h3>
								<h3>{p.time} min</h3>
								<span
									class="material-symbols-outlined"
									id={p.id}
									onClick={(e) => {
										deleteService(e.target.id);
									}}>
									delete
								</span>
							</div>
						);
					})}
					{addServiceView ? (
						<div className="inputNewService">
							<input placeholder="Name" id="Name"></input>
							<input placeholder="Price" id="Price"></input>
							<input placeholder="Time" id="Time"></input>
							<span
								class="material-symbols-outlined"
								style={{ color: "green" }}
								onClick={(e) => {
									let name = document.getElementById("Name").value;
									document.getElementById("Name").value = "";
									let price = document.getElementById("Price").value;
									document.getElementById("Price").value = "";
									let time = document.getElementById("Time").value;
									document.getElementById("Time").value = "";

									postNewService({
										service_name: name,
										price: price,
										time: time,
										partner_id: partnerId,
									});
								}}>
								done
							</span>{" "}
						</div>
					) : (
						""
					)}
				</div>
			) : (
				"No Services"
			)}
			<button
				onClick={() => {
					setAddServiceView(true);
				}}>
				Add
			</button>
		</div>
	);
}
export default ServiceUpload;
