import React, { useEffect, useState } from "react";
import "./product.css";
import ReactStars from "react-rating-stars-component";
import Review from "./Review/review";
import SocialMediaBar from "./SocialMediaBar/SocialMedia";
import { db } from "../firebase";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import NavBar from "../navBar/NavBar";
import { useParams } from "react-router-dom";
import Calendar from "../calendar/calendar";
import { Scheduler } from "@devexpress/dx-react-scheduler-material-ui";
import ServiceList from "./ServiceList/serviceList";
const Product = () => {
	const { productId } = useParams();
	var [navParam, setNavParam] = useState("Product");

	const partnerRef = doc(db, "partner", productId);

	var [service, setService] = useState();
	function setService_and_swich_calendar(p) {
		setService(p);
		setNavParam("Calendar");
	}

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
		<div className="ProductPageContainer">
			<NavBar />
			<div className="rowFlex">
				<div className="leftNavBar">
					<label
						onClick={() => {
							setNavParam("Product");
						}}>
						Product
						<span class="material-symbols-outlined">chevron_right</span>
					</label>
					<label
						onClick={() => {
							setNavParam("Review");
						}}>
						Reviews
						<span class="material-symbols-outlined">chevron_right</span>
					</label>
					<label
						onClick={() => {
							setNavParam("Service");
						}}>
						Appointment
						<span class="material-symbols-outlined">chevron_right</span>
					</label>
				</div>
				{navParam == "Product" ? (
					<div className="product">
						<div className="productDescription">
							<img src={params.img[0]}></img>
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
				) : (
					""
				)}
				{navParam == "Review" ? <Review params={productId} /> : ""}
				{navParam == "Service" ? (
					<ServiceList
						params={productId}
						setService={setService_and_swich_calendar}
					/>
				) : (
					""
				)}
				{navParam == "Calendar" ? (
					<div className="calendarDimensions">
						<h2 className="sectiontitle"> Reserve an Appointment</h2>
						<h3 className="sectionDescription">
							{" "}
							Choose a time slot and wait for the partner's confiramtion
						</h3>
						<Calendar
							productId={productId}
							displayOnly={false}
							service={service}
						/>
					</div>
				) : (
					""
				)}
			</div>
			<SocialMediaBar />
		</div>
	);
};

export default Product;
