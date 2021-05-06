import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firebase-database';
import 'firebase/firebase-auth';

const config = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  databaseURL: process.env.VUE_APP_databaseURL,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId,
};

firebase.initializeApp(config);
const db = firebase.database();
const auth = firebase.auth();
const storageref = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export { db, auth, storageref, googleProvider };
