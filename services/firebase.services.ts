/*
|--------------------------------------------------------------------------
| Npm Imports
|--------------------------------------------------------------------------
*/
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/*
|--------------------------------------------------------------------------
| Custom imports / Config
|--------------------------------------------------------------------------
*/
const FIREBASE_APP_ID = '1:858939704621:android:4f446300f2b1cb416d7fa4';
const FIREBASE_API_KEY = 'AIzaSyCLEHKeK2-vcN03Jf3a-mx2I93GtH1EUQU';
const FIREBASE_PROJECT_ID = 'maple-803ba';
const FIREBASE_AUTH_DOMAIN = 'maple-803ba.firebaseapp.com';
const FIREBASE_STORAGE_BUCKET = 'maple-803ba.appspot.com';
const FIREBASE_MESSAGING_SENDER_ID = '858939704621';

const FIREBASE_CONFIG = {
	appId: FIREBASE_APP_ID,
	apiKey: FIREBASE_API_KEY,
	projectId: FIREBASE_PROJECT_ID,
	authDomain: FIREBASE_AUTH_DOMAIN,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
};

export { getApp, getApps, FIREBASE_CONFIG, initializeApp, getFirestore };
