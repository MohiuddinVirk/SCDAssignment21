/* eslint-disable import/prefer-default-export */
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDEPbJjXFH1SVhR2byuhmzryFyVN5afhMM",
  authDomain: "freelancepaltform.firebaseapp.com",
  projectId: "freelancepaltform",
  storageBucket: "freelancepaltform.appspot.com",
  messagingSenderId: "380133425343",
  appId: "1:380133425343:web:6c14aa4256bc6b89e5460a",
  measurementId: "G-6G2HFMDKVZ"
};

const app = initializeApp(firebaseConfig);
// Firebase storage reference
export const storage = getStorage(app);
// export default storage;
