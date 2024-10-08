// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASEAPIKEY,
  authDomain: "mern-blog-d3c11.firebaseapp.com",
  projectId: "mern-blog-d3c11",
  storageBucket: "mern-blog-d3c11.appspot.com",
  messagingSenderId: "723159012288",
  appId: "1:723159012288:web:6693ea68f4d2239571ee25",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
