import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7xHkY18ZPoGptohmNb14sLSLJ-_h9vqI",
    authDomain: "bloggershub-a6b28.firebaseapp.com",
    projectId: "bloggershub-a6b28",
    storageBucket: "bloggershub-a6b28.appspot.com",
    messagingSenderId: "261857109190",
    appId: "1:261857109190:web:44248cac09cf9e535523c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.error(result.user);
        });
};

const logOut = () => {
    signOut(auth)
        .then(() => {
            console.log("User signed out");
        })
        .catch((error) => {
            console.error(error);
        });
};


export { auth, signInWithGoogle, logOut };
