import "./ReviewCard.css";
function ReviewCard(props) {
	let params = props.params;
	return (
		<div className="reviewCardContainer">
			<p>{params.content}</p>
			<h1>{params.user_name}</h1>
			<label>{params.date}</label>
		</div>
	);
}

export default ReviewCard;
