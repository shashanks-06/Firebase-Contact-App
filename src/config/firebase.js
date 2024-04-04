// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADD-HlX4RfNy5nm31AqYbIW1O359Us3vk",
  authDomain: "vite-contact-app-b1d01.firebaseapp.com",
  projectId: "vite-contact-app-b1d01",
  storageBucket: "vite-contact-app-b1d01.appspot.com",
  messagingSenderId: "668606272352",
  appId: "1:668606272352:web:6b0bc764d2da9b65d70405",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
