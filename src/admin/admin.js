import "./admin.css";
import { db } from "../firebase";
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
import TableDisplay from "./tableDisplay/tableDisplay";
function Admin() {
	var [params, setParms] = useState([]);
	var { partnerId } = useParams();

	const reviewRef = collection(db, "partner");

	async function getData() {
		await getDocs(reviewRef).then((snapshot) => {
			let p = [];
			snapshot.forEach((s) => {
				p.push({ ...s.data(), id: s.id });
			});
			console.log(p);
			setParms(p);
		});
	}

	const updateAppointment = async (id, s) => {
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
		<div>
			<div className="admipageTitleContainer">
				<h2>Admin portal</h2>
			</div>
			<div className="adminTablesSection">
				<h3>Pending Partners</h3>
				<TableDisplay
					params={params.filter((p) => p.status === "submitted")}
					updateAppointment={updateAppointment}
					setParms={setParms}
					reactive={true}
				/>
				<h3>Approved Partners</h3>
				<TableDisplay
					params={params.filter((p) => p.status === "approved")}
					updateAppointment={updateAppointment}
					setParms={setParms}
					reactive={false}
				/>
			</div>
		</div>
	);
}

export default Admin;
