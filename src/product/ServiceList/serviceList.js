import "./serviceList.css";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from "react";
function ServiceList(props) {
	var productId = props.params;
	var setService = props.setService;
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
	useEffect(() => {
		let q = query(ref, where("partner_id", "==", productId));
		getData(q);
	}, []);

	return (
		<div>
			<h1 className="serviceSectionTitle">Services</h1>
			{params.length != 0 ? (
				<div className="servicesListWrapper">
					<div className="infoBar">
						<h2>Name</h2>
						<h3>Price </h3>
						<h3>Time</h3>
					</div>
					{params.map((p) => {
						return (
							<div
								className="serviceWrapper"
								onClick={() => {
									setService(p.service_name);
								}}>
								<h2>{p.service_name}</h2>
								<h3>{p.price} dt</h3>
								<h3>{p.time} min</h3>
							</div>
						);
					})}
				</div>
			) : (
				"No Services"
			)}
		</div>
	);
}

export default ServiceList;
