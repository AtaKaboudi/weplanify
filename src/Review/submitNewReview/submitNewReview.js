import "./submitNewReview.css";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { db } from "../../firebase";
import { doc, addDoc, collection } from "firebase/firestore";

function SubmitNewReview(props) {
	var { partnerId, callback } = props.params;
	var user_name = "Ata Kaboudi";

	var [newReview, setNewReview] = useState({});
	var [alertMissingInput, setAlertMissingInput] = useState(false);

	async function submitReview() {
		if (!newReview.review) {
			setAlertMissingInput(true);
			return;
		}

		var today = new Date();

		await addDoc(collection(db, "review"), {
			company_id: partnerId,
			user_name: user_name,
			date: today.getDay() + "-" + today.getMonth() + "-" + today.getFullYear(),
			content: newReview.review,
		})
			.then(() => {
				callback();
			})
			.catch((e) => {
				console.log(e);
			});
	}
	return (
		<div className="srWrapper">
			<div className="reviewWrapper">
				<h3>Your opinion matters to us</h3>
				<textarea
					onChange={(e) => {
						setNewReview({ ...newReview, review: e.target.value });
					}}
					maxLength={200}></textarea>

				<button
					onClick={() => {
						submitReview();
					}}>
					Submit
				</button>
				{alertMissingInput ? (
					<label style={{ color: "#FF0000", margin: "3vh" }}>
						Please fill both rating and review
					</label>
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default SubmitNewReview;
