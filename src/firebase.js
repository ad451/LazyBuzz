import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDoZ7ARQwbj9-VbZ0DCU99iELiqeFJWW8c",
  authDomain: "lazybuzz-f2e09.firebaseapp.com",
  projectId: "lazybuzz-f2e09",
  storageBucket: "lazybuzz-f2e09.appspot.com",
  messagingSenderId: "338591415969",
  appId: "1:338591415969:web:e813bf551bcd5cf6df3ae0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };
