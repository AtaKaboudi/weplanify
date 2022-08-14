import NavBar from "../navBar/NavBar";
import "./main.css";
import { useNavigate } from "react-router-dom";
import BestPartner from "./bestPartners/bestPartner";
import Footer from "./footer/footer";
import Category from "./categoriesList/category";
const Main = () => {
	let navigate = useNavigate();
	return (
		<div className="pageWrapper">
			<NavBar />
			<div className="imgWrapper">
				<label className="logo">WePlanify</label>
				<h1>Connecting you with the best service providers in Town</h1>
			</div>
			<BestPartner />
			<Category />
			<Footer />
		</div>
	);
};

export default Main;
