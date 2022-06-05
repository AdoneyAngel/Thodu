// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ3Lo2K3XF5Yn4sp40N5zDzmeZQRJwwSQ",
  authDomain: "thodu-f3fb0.firebaseapp.com",
  projectId: "thodu-f3fb0",
  storageBucket: "thodu-f3fb0.appspot.com",
  messagingSenderId: "18088097011",
  appId: "1:18088097011:web:8ad5f04f063cf481e43386"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore(app)