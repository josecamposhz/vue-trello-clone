import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { doSnapshot } from './helpers';

// firebase.initializeApp({
// 	apiKey: process.env.VUE_APP_APIKEY,
// 	authDomain: process.env.VUE_APP_AUTHDOMAIN,
// 	databaseURL: process.env.VUE_APP_DATABASEURL,
// 	projectId: process.env.VUE_APP_PROJECTID,
// 	storageBucket: process.env.VUE_APP_STORAGEBUCKET,
// 	messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
// 	appId: process.env.VUE_APP_APPID,
// });
firebase.initializeApp({
  apiKey: 'AIzaSyAI9NjrJCEJoh-h1dWXsl7y4iDuboRmDCA',
  authDomain: 'vuetrello-clone.firebaseapp.com',
  projectId: 'vuetrello-clone',
  storageBucket: 'vuetrello-clone.appspot.com',
  messagingSenderId: '746784098382',
  appId: '1:746784098382:web:53cb5c3b39baccf6361b1f',
});

const db = firebase.firestore();
const auth = new firebase.auth();

export { db, auth, firebase, doSnapshot };
