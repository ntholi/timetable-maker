// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA74K_m3FAq2QQDVpc6uVbPf3VfH-oyORQ',
  authDomain: 'limkokwing-timetable.firebaseapp.com',
  projectId: 'limkokwing-timetable',
  storageBucket: 'limkokwing-timetable.appspot.com',
  messagingSenderId: '526104090901',
  appId: '1:526104090901:web:f156c82107c5fe12fa711c',
};

// Initialize Firebase
const app = getApp() || initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
