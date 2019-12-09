import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCiRF-8qxnMh0m5D7r58gfMykbSUXkuPv8",
    authDomain: "chotothon-48d8b.firebaseapp.com",
    databaseURL: "https://chotothon-48d8b.firebaseio.com",
    projectId: "chotothon-48d8b",
    storageBucket: "chotothon-48d8b.appspot.com",
    messagingSenderId: "97289463772",
    appId: "1:97289463772:web:f4bb29aa6fdb7ea05bd119",
    measurementId: "G-7YLGMYN952"
  };

firebase.initializeApp(firebaseConfig);
  // Initialize Firebase
export default firebase;
  //firebase.analytics();