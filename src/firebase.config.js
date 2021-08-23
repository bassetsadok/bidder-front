// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyC36ICn3nqnkR-GcqR5yQlcLeHt8DfukOw',
  authDomain: 'bidder-393dc.firebaseapp.com',
  projectId: 'bidder-393dc',
  storageBucket: 'bidder-393dc.appspot.com',
  messagingSenderId: '861159015155',
  appId: '1:861159015155:web:ac465de99643ec88396d86',
  measurementId: 'G-VPFE5E0W14',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth;

export const db = firebase.firestore();
