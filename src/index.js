import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Product from "./product/product";
import NavBar from "./navBar/NavBar";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigate from "./navigate/navigate";
import Main from "./main/main";
import AppoitmentScheduler from "./scheduler/scheduler";
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
				<Route path="navigate" element={<Navigate />} />
				<Route path="scheduler" element={<AppoitmentScheduler />} />
			</Routes>
		</BrowserRouter>
	</div>
);
