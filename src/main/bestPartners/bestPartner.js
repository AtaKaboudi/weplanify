import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import PartnerCard from "./partnerCard/partnerCard";
import "./bestPartner.css";
function BestPartner(props) {
	let [params, setParams] = useState([]);
	let [index, setIndex] = useState(0);
	const partnersPerPage = 4;
	const ref = collection(db, "partner");

	let q = query(ref, where("rating", ">", 1));

	async function getData(q) {
		await getDocs(q).then((snapshot) => {
			let p = [];
			snapshot.forEach((s) => {
				p.push({ ...s.data(), id: s.id });
			});
			setParams(p);
		});
	}
	useEffect(() => {
		getData(q);
	}, []);

	return (
		<div className="bestPartnerWrapper">
			<div className="sectionTitleWrapper">
				<h2>Discover Our Best Partners</h2>
				<label>Top Rated Service providers</label>
				<div className="arrowWrapper">
					<span
						class="material-symbols-outlined"
						onClick={() => {
							if (index < partnersPerPage - 1) return;
							setIndex(index - 4);
						}}>
						chevron_left
					</span>
					<span
						class="material-symbols-outlined"
						onClick={() => {
							if (index > params.length - partnersPerPage) return;
							setIndex(index + 4);
						}}>
						chevron_right
					</span>{" "}
				</div>
			</div>
			<div className="partnersCardContainer">
				{params.slice(index, index + partnersPerPage).map((p) => (
					<PartnerCard params={p} />
				))}
			</div>
		</div>
	);
}

export default BestPartner;
