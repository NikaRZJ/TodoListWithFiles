// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbiYVpsXevfq_HUSUZoBx9P4zRoD9zNwI",
    authDomain: "test-woman-up.firebaseapp.com",
    databaseURL: "https://test-woman-up-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-woman-up",
    storageBucket: "test-woman-up.appspot.com",
    messagingSenderId: "895237669309",
    appId: "1:895237669309:web:aa30f9b38f763d87ac12d4"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);