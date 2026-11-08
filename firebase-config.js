// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1aJBgOGB7lUYZeJ5f9PTzGsrGHDi01lA",
  authDomain: "ncp-aio-lab-mock-exam.firebaseapp.com",
  projectId: "ncp-aio-lab-mock-exam",
  storageBucket: "ncp-aio-lab-mock-exam.firebasestorage.app",
  messagingSenderId: "197087245797",
  appId: "1:197087245797:web:95d7498603ac9a431aeb0c",
  measurementId: "G-K09E31P3WF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);