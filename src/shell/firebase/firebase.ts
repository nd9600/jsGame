import firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "./firebaseConfig";

/* 
firebaseConfig is like {
    apiKey: "apiKeyHere",
    authDomain: "xyz.firebaseapp.com",
    databaseURL: "https://xyz.firebaseio.com",
    projectId: "xyz",
    storageBucket: "xyz.appspot.com",
    messagingSenderId: "senderIDHere"
}
*/

firebase.initializeApp(firebaseConfig);

export default firebase.database();