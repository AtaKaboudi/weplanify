import React, { useEffect, useState } from "react";
import "./product.css";
import ReactStars from "react-rating-stars-component";
import Review from "../Review/review";
import SocialMediaBar from "../SocialMediaBar/SocialMedia";
import { db } from "../firebase";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import NavBar from "../navBar/NavBar";
import { useParams } from "react-router-dom";
const Product = () => {
	const { productId } = useParams();

	const partnerRef = doc(db, "partner", productId);

	async function getData() {
		return await getDoc(partnerRef);
	}

	useEffect(() => {
		getData().then((doc) => {
			setParams({ ...doc.data(), id: doc.id });
		});
		console.log(params.rating);
	}, []);

	const [params, setParams] = useState({
		name: "Barber Test",
		category: "Barber test",
		address: "3,rue Marseille, Tunis",
		description:
			"A barber is a person whose occupation is mainly to cut, dress, groom, style and shave men's and boys' hair or beards. A barber's place of work is known as a barbershop or a barber's. Barbershops are also places of social interaction and public discourse. In some instances, barbershops are also public fora.",
		paiement_method: "onsite",
		img: "https://images.pexels.com/photos/1319461/pexels-photo-1319461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	});

	return (
		<div className="PageContainer">
			<NavBar />
			<div className="product">
				<div className="productDescription">
					<img src={params.img}></img>
					<div className="infoContainer">
						<h1 className="productName">{params.company_name}</h1>
						<div className="descriptiveLabel">
							<label>Category</label>
							<label>{params.category}</label>
						</div>
						<div className="descriptiveLabel">
							<label>Adress</label>
							<label>{params.address}</label>
						</div>
						<div className="descriptiveLabel">
							<label>Paiement</label>
							<label>{params.paiement_method}</label>
						</div>
						<div className="descriptionContainer">
							<label>Description</label>
							<p>{params.description}</p>
						</div>
						<div className="ratingStarsContainer">
							<label>Rating</label>
							{params.rating ? (
								<ReactStars
									value={params.rating}
									count={5}
									onChange={() => {}}
									size={25}
									activeColor="#ffd700"
								/>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
			<Review params={productId} />
			<SocialMediaBar />
		</div>
	);
};

export default Product;
