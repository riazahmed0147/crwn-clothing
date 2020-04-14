import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDgBZcf97-5DZzGsBbpG-sN3kBbfPRF-sk",
  authDomain: "crwn-db-f4618.firebaseapp.com",
  databaseURL: "https://crwn-db-f4618.firebaseio.com",
  projectId: "crwn-db-f4618",
  storageBucket: "crwn-db-f4618.appspot.com",
  messagingSenderId: "446442738914",
  appId: "1:446442738914:web:629052f7bd4c8a1f9f7abb",
  measurementId: "G-WVK6QF118Q"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth, additionalData)

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
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
