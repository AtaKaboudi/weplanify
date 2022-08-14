import "./appoitmentRequests.css";
import { db } from "../../../firebase";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
	updateDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function AppoitmentRequests() {
	var [params, setParms] = useState([]);
	var { partnerId } = useParams();

	const reviewRef = collection(db, "appoitment");

	async function getData() {
		var q = query(reviewRef, where("partner_id", "==", partnerId));

		await getDocs(q).then((snapshot) => {
			let p = [];
			snapshot.forEach((s) => {
				p.push({ ...s.data(), id: s.id });
			});
			setParms(p.filter((item) => item.status === "pending"));
		});
	}

	const updateAppointment = async (e, id, s) => {
		const appoirmentRef = doc(db, "appoitment", id);

		try {
			await updateDoc(appoirmentRef, {
				status: s,
			});
		} catch (err) {
			alert(err);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="appoitmentRequestsComponentWraper">
			<div className="appoitmnetRequestLabel">
				<h3>Name</h3>
				<label>Service</label>
				<label>Date</label>
				<label>Time</label>
			</div>
			{params
				? params.map((d, i) => {
						return (
							<div className="appoitmnetRequestWrapper">
								<h3>{d.name}</h3>
								<label>{d.service}</label>
								<label>{d.date}</label>
								<label>{d.time}</label>
								<div className="spanWrapper">
									<span
										class="material-symbols-outlined"
										id={d.id}
										key={i}
										onClick={(e) => {
											updateAppointment(e, d.id, "accepted");
											setParms(params.filter((item) => item.id !== d.id));
										}}>
										check
									</span>
									<span
										class="material-symbols-outlined"
										id={d.id}
										onClick={(e) => {
											updateAppointment(e, d.id, "denied");
											setParms(params.filter((item) => item.id !== d.id));
										}}>
										do_not_disturb_on
									</span>
								</div>
							</div>
						);
				  })
				: null}
		</div>
	);
}

export default AppoitmentRequests;
