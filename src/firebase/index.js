import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firebase-database";
import "firebase/firebase-auth";
import config from "./cred";

firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();
const storageref = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export { db, auth, storageref, googleProvider };
