import { useEffect, useState } from "react";
import "./productCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
	let params = props.params;
	const navigate = useNavigate();

	function rerouteToProduct() {
		navigate("/product/" + params.id);
	}
	return (
		<div
			className="cardContainer"
			onClick={() => {
				rerouteToProduct();
			}}>
			<img src={params.img}></img>
			<div className="infoWrapper">
				<label className="CategoryLabel">{params.category}</label>
				<h1>{params.company_name}</h1>
				<div className="horizontalLabel">
					<label> Owner</label>
					<label> {params.owner_name}</label>
				</div>
				<div className="rowFlex">
					<div className="verticalLabel">
						<h3> {params.rating}</h3>
						<label> Rating</label>
					</div>
					<div className="verticalLabel">
						<h3> 20 </h3>
						<label> Starting Price</label>
					</div>
				</div>
				<div className="moreInfoWrapper">
					<label>More</label>
					<span class="material-symbols-outlined">chevron_right</span>
				</div>
			</div>
		</div>
	);
};
export default ProductCard;
