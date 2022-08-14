import "./navigate.css";
import NavBar from "../navBar/NavBar";
import FilterBar from "./filterBar/filterBar";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./productCard/productCard";
import Map from "./map/map";
const Navigate = () => {
	var [params, setParams] = useState([]);
	var [paginationIndexDOMElement, setPaginationIndexDOMElement] = useState([]);
	var [startingIndex, setStartingIndex] = useState(0);

	var InitialCategory = useParams();

	const ref = collection(db, "partner");

	async function getData(q) {
		await getDocs(q)
			.then((snapshot) => {
				let p = [];
				snapshot.forEach((s) => {
					p.push({ ...s.data(), id: s.id });
				});
				console.log(p);
				setParams(p.filter((e) => e.status == "approved"));
			})
			.catch((e) => {
				console.log(e);
			});
	}
	//INITIAL DATA FETCH
	useEffect(() => {
		if (InitialCategory.category !== 0) {
			applyFilter({
				filter: "category",
				op: "==",
				value: InitialCategory.category,
			});
			return;
		}

		getData(query(ref));
	}, []);
	var mapParams = {};

	// adapt pagination on new data fetch
	useEffect(() => {
		adaptPagination();
	}, [params]);

	function applyFilter(fitlerObject) {
		// Check if filter is empty for first render
		if (Object.keys(fitlerObject).length === 0) return;
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
			<div className="rowFlex">
				<div className="leftPannel">
					<h2 className="LeftPannelTitle">The Best Partners In Town</h2>
					{params.length !== 0 ? (
						params.map((a, i) => {
							if (i >= startingIndex && i < startingIndex + CARDSPERPAGE + 1)
								return <ProductCard params={a} key={i} />;
						})
					) : (
						<div className="NoMatch">
							<h2>No Matches Try Another filter</h2>
							<span class="material-symbols-outlined">front_hand</span>
						</div>
					)}
					<div className="paginationButtons">{paginationIndexDOMElement}</div>
				</div>
				<div className="rightPannel">
					<Map params={params} />
				</div>
			</div>
		</div>
	);
};

export default Navigate;
