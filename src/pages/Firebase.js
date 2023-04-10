
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDwDxLaz7aSmkm0XreRFbFUIf5zygLTX6Q",
  authDomain: "chatappinreact-e6165.firebaseapp.com",
  projectId: "chatappinreact-e6165",
  storageBucket: "chatappinreact-e6165.appspot.com",
  messagingSenderId: "748792762544",
  appId: "1:748792762544:web:ec4f325f4ac86049be2b75"
};


// const firebaseConfig = {
//     apiKey: "AIzaSyC5_ly8TBOKSGHXMG8zV9KfrWZQWyG--Ic",
//     authDomain: "rhythm-application.firebaseapp.com",
//     databaseURL: "https://rhythm-application.firebaseio.com",
//     projectId: "rhythm-application",
//     storageBucket: "rhythm-application.appspot.com",
//     messagingSenderId: "877731215194",
//     serverkey: "AAAAzFzbd1o:APA91bFewgWZ7hAu8rOyNN2e3uaZI-QH9866xX1QxCVu1nUfFaeH9uCnwpwl49e4ElVLvfzhoQDrOh-miYi3RAusDjlxe_pU2wDZLndnwvQ_xos9RL2lTBLeXM5-nPmXQemj5TVrt0ou",
//     senderid: "877731215194",
//     dbname: "rhythm-application",
//     dbsecret: "CJ9V3SaoV5fyjZYGc2gOKWtiZAcY558wlcG4yDB9"

// };
// Initialize Firebase


export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()



