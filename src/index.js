import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Product from "./product/product";
import NavBar from "./navBar/NavBar";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigate from "./navigate/navigate";
import Main from "./main/main";
import Calendar from "./calendar/calendar";
import PartnerMain from "./partnerCase/main/main";
import PartnerForm from "./partnerCase/Form/form";
import PartnerCalendar from "./partnerCase/partnerCalendar/partnerCalendar";
import PartnerCalendarPage from "./partnerCase/partnerCalendarPage/partnerCalendarPage";
import Login from "./auth/auth";
import Register from "./auth/register/register";
import Admin from "./admin/admin";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<div>
		<link
			rel="stylesheet"
			href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
		/>
		<BrowserRouter>
			<Routes>
				<Route path="" element={<Main />} />
				<Route path="product/:productId" element={<Product />} />
				<Route path="navigate/:category" element={<Navigate />} />
				<Route path="scheduler" element={<Calendar />} />
				<Route path="partner/:partnerId" element={<PartnerMain />} />
				<Route
					path="partner/information/:partnerId"
					element={<PartnerForm />}
				/>
				<Route
					path="partner/calendar/:partnerId"
					element={<PartnerCalendarPage />}
				/>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="admin" element={<Admin />} />
			</Routes>
		</BrowserRouter>
	</div>
);
