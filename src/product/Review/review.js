import "./review.css";
import ReviewCard from "./ReviewCard/ReviewCard";
import SubmitNewReview from "./submitNewReview/submitNewReview";
import { db } from "../../firebase";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
function Review(props) {
	let partnerId = props.params;
	var [reviews, setReviews] = useState([]);
	var [submitReview, setSubmitReview] = useState(false);

	const reviewRef = collection(db, "review");
	var q = query(reviewRef, where("company_id", "==", partnerId));

	async function getData(q) {
		await getDocs(q).then((snapshot) => {
			let p = [];
			snapshot.forEach((s) => {
				p.push({ ...s.data(), id: s.id });
			});
			console.log(p);
			setReviews(p);
		});
	}

	useEffect(() => {
		getData(q);
	}, []);

	return (
		<div className="reviewContainer">
			<h1 className="ReviewTitle">Community Review</h1>
			<div className="reviewCardsContainer">
				{reviews.length != 0 ? (
					reviews.map((p) => {
						return <ReviewCard params={p} />;
					})
				) : (
					<div className="noReviews">
						<span class="material-symbols-outlined">error</span>
						<h3>No Reviews Yet</h3>
						<h3>
							Contribute to our project by providing feedback for our partner
						</h3>
					</div>
				)}
			</div>
			<div className="addReviewButtonContainer">
				<button
					className="addReviewButton"
					title="Add Review"
					onClick={() => {
						setSubmitReview(true);
						window.scrollTo({ left: 0, top: "550", behavior: "smooth" });
					}}>
					<span class="material-symbols-outlined">add</span>
				</button>
			</div>
			{submitReview ? (
				<SubmitNewReview
					params={{
						partnerId: partnerId,
						callback: () => {
							setSubmitReview(false);
							window.location.reload(false);
						},
					}}
				/>
			) : (
				""
			)}
		</div>
	);
}

export default Review;
