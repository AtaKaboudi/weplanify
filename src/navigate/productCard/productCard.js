import { useEffect, useState } from "react";
import "./productCard.css";
import { useNavigate } from "react-router-dom";
import Calendar from "../../calendar/calendar";
import ReactStars from "react-rating-stars-component";
const ProductCard = (props) => {
	let params = props.params;
	const navigate = useNavigate();

	function rerouteToProduct() {
		navigate("/product/" + params.id);
	}
	return (
		<div className="cardContainer">
			<img src={params.img[0]}></img>
			<div className="infoWrapper">
				<h1>{params.company_name}</h1>
				<div className="horizontalLabel">
					<label className="CategoryLabel">{params.category}</label>
				</div>

				<div className="addressContainer">
					<h3>{params.address}</h3>
				</div>
				<div className="verticalLabel">
					<label> Rating</label>
					<ReactStars
						value={params.rating}
						count={5}
						onChange={() => {}}
						size={25}
						activeColor="#ffd700"
						displayOnly={true}
					/>
				</div>
				<button
					className="learnMoreButton"
					onClick={() => {
						rerouteToProduct();
					}}>
					<label> Learn More</label>
					<span class="material-symbols-outlined">chevron_right</span>
				</button>
			</div>
			<Calendar
				nbDays={3}
				displayOnly={true}
				productId={params.id}
				calendarWidth={34 + "vw"}
				timeSlotsNumberLimit={6}
			/>
			={" "}
		</div>
	);
};
export default ProductCard;
