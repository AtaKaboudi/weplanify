import "./navigate.css";
import NavBar from "../navBar/NavBar";
import FilterBar from "./filterBar/filterBar";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import ProductCard from "./productCard/productCard";
const Navigate = () => {
	var [params, setParams] = useState([]);
	var [paginationIndexDOMElement, setPaginationIndexDOMElement] = useState([]);
	var [startingIndex, setStartingIndex] = useState(0);

	const ref = collection(db, "partner");

	async function getData(q) {
		await getDocs(q).then((snapshot) => {
			let p = [];
			snapshot.forEach((s) => {
				p.push({ ...s.data(), id: s.id });
			});
			setParams(p);
		});
	}
	//INITIAL DATA FETCH
	useEffect(() => {
		getData(query(ref));
	}, []);

	// adapt pagination on new data fetch
	useEffect(() => {
		adaptPagination();
	}, [params]);

	function applyFilter(fitlerObject) {
		// Check if filter is empty for first render
		if (Object.keys(fitlerObject).length == 0) return;
		let q = query(
			ref,
			where(fitlerObject.filter, fitlerObject.op, fitlerObject.value)
		);
		getData(q);
		setStartingIndex(0);
	}
	const CARDSPERPAGE = 4;

	function adaptPagination() {
		let pagesNumber;
		if (params.length > CARDSPERPAGE)
			pagesNumber = params.length % CARDSPERPAGE;
		else pagesNumber = 1;
		let aux = [];
		for (let i = startingIndex; i < pagesNumber; i++) {
			aux.push(
				<button
					onClick={() => {
						setStartingIndex(i * CARDSPERPAGE);
					}}>
					{i}
				</button>
			);
		}

		setPaginationIndexDOMElement(aux);
	}

	return (
		<div className="pageWrapper">
			<NavBar />
			<FilterBar parentUpdate={applyFilter} />
			<div className="leftPannel">
				<h2 className="LeftPannelTitle">The Best Partners In Town</h2>
				{params.length != 0 ? (
					params.map((a, i) => {
						if (i >= startingIndex && i < startingIndex + CARDSPERPAGE)
							return <ProductCard params={a} key={i} />;
					})
				) : (
					<div className="NoMatch">
						<h2>No Matches Try Another filter</h2>
						<span class="material-symbols-outlined">front_hand</span>
					</div>
				)}
			</div>
			<div className="paginationButtons">{paginationIndexDOMElement}</div>
		</div>
	);
};

export default Navigate;
