import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Owlapp's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: 'AIzaSyBorwsuQjVgab1YPHjkCimu7tHS1mrF74o',
  authDomain: 'owlapp-382d8.firebaseapp.com',
  projectId: 'owlapp-382d8',
  storageBucket: 'owlapp-382d8.appspot.com',
  messagingSenderId: '638891321245',
  appId: '1:638891321245:web:22e1639aa5c6e76eb03174',
  measurementId: 'G-NKVZ6F1X3N'
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db;