import firebase from 'firebase/app';
import 'firebase/database';
import Config from 'react-native-config';
var firebaseConfig = {
  apiKey: Config.FIREBASE_APIKEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  databaseURL: Config.FIREBASE_DATABASE_URL,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MSG_SENDER_ID,
  appId: Config.FIREBASE_APPID,
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// var db = firebase.firestore();

// export default db;

const fireDb = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export default fireDb.database().ref();
