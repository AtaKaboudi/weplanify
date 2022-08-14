import {
	auth,
	logInWithEmailAndPassword,
	signInWithGoogle,
	getCompanyIdByUserId,
} from "../firebase";
import "./auth.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [tryAgain, setTryAgain] = useState(false);
	const navigate = useNavigate();
	async function handleLogin() {
		console.log("handlingLogin");
		const { user, role } = await logInWithEmailAndPassword(
			email,
			password
		).catch((err) => {
			setTryAgain(true);
		});

		if (!user) return alert("Something went wrong");
		localStorage.setItem("wePlanifyToken", user.accessToken);

		if (role == "partner") {
			const companyId = await getCompanyIdByUserId(user.user.uid);
			navigate("/partner/" + companyId);
		} else {
			navigate("/navigate/0");
		}
	}
	return (
		<div className="login">
			<div className="login__container">
				<input
					type="text"
					className="login__textBox"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="E-mail Address"
				/>
				<input
					type="password"
					className="login__textBox"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				{tryAgain ? <h5 style={{ color: "red" }}>Invalid Credentials</h5> : ""}
				<button className="login__btn" onClick={() => handleLogin()}>
					Login
				</button>
				<button className="login__btn login__google" onClick={signInWithGoogle}>
					Login with Google
				</button>
				<div>
					<Link to="/reset">Forgot Password</Link>
				</div>
				<div>
					Don't have an account? <Link to="/register">Register</Link> now.
				</div>
			</div>
		</div>
	);
}

export default Login;
