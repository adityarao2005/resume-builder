// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirebaseApiKey, getFirebaseAppId, getFirebaseAuthDomain, getFirebaseMessagingSenderId, getFirebaseProjectId, getFirebaseStorageBucket } from "@/config/env";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: getFirebaseApiKey(),
    authDomain: getFirebaseAuthDomain(),
    projectId: getFirebaseProjectId(),
    storageBucket: getFirebaseStorageBucket(),
    messagingSenderId: getFirebaseMessagingSenderId(),
    appId: getFirebaseAppId(),
    measurementId: getFirebaseMessagingSenderId()
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);