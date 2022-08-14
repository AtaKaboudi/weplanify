import "./partnerCard.css";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
function PartnerCard(props) {
	let params = props.params;
	const navigate = useNavigate();

	function rerouteToProduct() {
		navigate("/product/" + params.id);
	}
	return (
		<div
			className="partnerCardContainer"
			onClick={() => {
				rerouteToProduct();
			}}>
			<label>{params.category}</label>
			<img
				className="partnerCardImage"
				src={params.horizental_img}
				alt="partnerCardImage"
			/>
			<h3>{params.company_name}</h3>
			<ReactStars
				value={params.rating}
				count={5}
				size={25}
				activeColor="#01B0F1"
				inactiveColor="#DADADA"
			/>
		</div>
	);
}
export default PartnerCard;
