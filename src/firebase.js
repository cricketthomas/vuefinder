import {
    initializeApp
  } from 'firebase';
  
  const app = initializeApp({
    apiKey: "AIzaSyC1c0LoY8qlxWNomybptoRb84T9zvIW7dE",
    authDomain: "vuefinder-1.firebaseapp.com",
    databaseURL: "https://vuefinder-1.firebaseio.com",
    projectId: "vuefinder-1",
    storageBucket: "vuefinder-1.appspot.com",
    messagingSenderId: "754880400097"
  });
  
  
  export const db = app.database();
  export const usersRef = db.ref('usersRef');
  