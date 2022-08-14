// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import {
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";
import {
	query,
	getDocs,
	getDoc,
	collection,
	where,
	addDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDPxPFbf2ogFkFn9KrVoMaz8d7ixmEFKHc",
	authDomain: "weplanify-1716b.firebaseapp.com",
	databaseURL: "https://weplanify-1716b-default-rtdb.firebaseio.com",
	projectId: "weplanify-1716b",
	storageBucket: "weplanify-1716b.appspot.com",
	messagingSenderId: "133528913305",
	appId: "1:133528913305:web:7f489d95ba1cb429bf3f08",
	measurementId: "G-XXGFTG630J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;
		const q = query(collection(db, "users"), where("uid", "==", user.uid));
		const docs = await getDocs(q);
		if (docs.docs.length === 0) {
			await addDoc(collection(db, "users"), {
				uid: user.uid,
				name: user.displayName,
				authProvider: "google",
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const logInWithEmailAndPassword = async (email, password) => {
	let user_;
	let role;

	try {
		user_ = await signInWithEmailAndPassword(auth, email, password);
		const usersRef = collection(db, "users");
		var q = query(usersRef, where("uid", "==", user_.user.uid));
		await getDocs(q).then((snapshot) => {
			let p = [];
			snapshot.forEach((s) => {
				p.push({ ...s.data(), id: s.id });
			});
			role = p[0].role;
		});
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
	return { user: user_, role: role };
};
const getCompanyIdByUserId = async (user_id) => {
	let companyId;
	const usersRef = collection(db, "partner");
	var q = query(usersRef, where("owner_uid", "==", user_id));
	await getDocs(q).then((snapshot) => {
		let p = [];
		console.log(snapshot);
		snapshot.forEach((s) => {
			p.push({ ...s.data(), id: s.id });
		});
		companyId = p[0].id;
	});
	return companyId;
};

const registerWithEmailAndPassword = async (name, email, password, role) => {
	let user_;
	let company_;
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		user_ = user;
		await addDoc(collection(db, "users"), {
			uid: user.uid,
			name,
			authProvider: "local",
			email,
			role: role,
		});
		if (role === "partner") {
			console.log("adding partner");
			company_ = await addDoc(collection(db, "partner"), {
				owner_uid: user.uid,
				owner_name: name,
				status: "initiated",
			}).catch((e) => {
				console.log(e);
			});
		}
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
	return { user_, company_ };
};
const logout = () => {
	signOut(auth);
};

const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert("Password reset link sent!");
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
export {
	db,
	storage,
	auth,
	signInWithGoogle,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	logout,
	sendPasswordReset,
	getCompanyIdByUserId,
};
