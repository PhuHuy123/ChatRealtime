// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvJ6zLm820xlNp1dWYYHXeZ1nJzM0N-hk",
  authDomain: "chatrealtime-f4bcc.firebaseapp.com",
  projectId: "chatrealtime-f4bcc",
  storageBucket: "chatrealtime-f4bcc.appspot.com",
  messagingSenderId: "781439236078",
  appId: "1:781439236078:web:4f0e0d5486aea9346c40ff",
  measurementId: "G-0KNDDRVZLE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
const auth = firebase.auth();

auth.useEmulator('http://localhost:9099')
if(window.location.hostname === 'localhost'){
  db.useEmulator('localhost', '8080');
}

export {db, auth}
export default firebase;