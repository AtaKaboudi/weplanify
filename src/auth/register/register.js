import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {
	auth,
	registerWithEmailAndPassword,
	signInWithGoogle,
} from "../../firebase";
import "./register.css";
function Register() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [user, loading, error] = useAuthState(auth);
	const [role, setRole] = useState("user");
	const history = useNavigate();

	const register = async () => {
		if (!name || !email || !password) alert("Please enter name");

		var { user_, company_ } = await registerWithEmailAndPassword(
			name,
			email,
			password,
			role
		);
		console.log(user_);
		console.log(company_);
		if (!user_) return alert("Something went wrong");
		localStorage.setItem("wePlanifyToken", user_.accessToken);
		if (role == "partner") {
			navigate("/partner/" + company_.id);
		} else {
			navigate("/navigate");
		}
	};
	useEffect(() => {
		if (loading) return;
	}, [user, loading]);
	return (
		<div className="register">
			<div className="register__container">
				<input
					type="text"
					className="register__textBox"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Full Name"
				/>
				<input
					type="text"
					className="register__textBox"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="E-mail Address"
				/>
				<input
					type="password"
					className="register__textBox"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<select
					onChange={(e) => {
						setRole(e.target.value);
					}}>
					<option>Role</option>
					<option value="user"> User </option>
					<option value="partner">Partner</option>
				</select>
				<button className="register__btn" onClick={register}>
					Register
				</button>

				<div>
					Already have an account? <Link to="/login">Login</Link> now.
				</div>
			</div>
		</div>
	);
}
export default Register;
