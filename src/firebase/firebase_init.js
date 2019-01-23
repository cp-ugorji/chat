import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA_fF4N552LVxRizQblqKVT65r-_d8lfVY",
    authDomain: "chux-stealth-chat.firebaseapp.com",
    databaseURL: "https://chux-stealth-chat.firebaseio.com",
    projectId: "chux-stealth-chat",
    storageBucket: "chux-stealth-chat.appspot.com",
    messagingSenderId: "229580959725"
};

const firebaseApp = firebase.initializeApp(config);

firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();