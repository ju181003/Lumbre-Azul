import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAjqXYTpTMNqGkja-S_yY7BjKWxoRCZ49c",
  authDomain: "lumbreazul-ea3fb.firebaseapp.com",
  projectId: "lumbreazul-ea3fb",
  storageBucket: "lumbreazul-ea3fb.firebasestorage.app",
  messagingSenderId: "125730053832",
  appId: "1:125730053832:web:684cd0259f3f0eafe9cffd",
  measurementId: "G-N2FJZK7VRB"
};

// Initialize Firebase (Compat Syntax)
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const auth = app.auth();
export const db = app.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const analytics = firebase.analytics();

// Export utility for server-side timestamps
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// Export the User type for use in other components
export type User = firebase.User;