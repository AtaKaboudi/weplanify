// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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

export const db = getFirestore(app);
