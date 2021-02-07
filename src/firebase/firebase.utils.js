import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyByRF5Ty36I8-1n6fsT4iBsASoXHLT6dcY",
  authDomain: "crwn-db-bf79b.firebaseapp.com",
  projectId: "crwn-db-bf79b",
  storageBucket: "crwn-db-bf79b.appspot.com",
  messagingSenderId: "738173769261",
  appId: "1:738173769261:web:780642d3e396b1b9d44aa4",
  measurementId: "G-855FYCP7YC",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
