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
const FIREBASE_APP_ID = '1:549719908172:ios:9a3d51693bc8282a1539e9';
const FIREBASE_API_KEY = 'AIzaSyA6ytIldyGYuAasBpXJ0HtSPpYhr9ebvLA';
const FIREBASE_PROJECT_ID = 'nafmfb-d8c92';
const FIREBASE_AUTH_DOMAIN = 'nafmfb-d8c92.firebaseapp.com';
const FIREBASE_STORAGE_BUCKET = 'nafmfb-d8c92.appspot.com';
const FIREBASE_MESSAGING_SENDER_ID = '549719908172';

const FIREBASE_CONFIG = {
	appId: FIREBASE_APP_ID,
	apiKey: FIREBASE_API_KEY,
	projectId: FIREBASE_PROJECT_ID,
	authDomain: FIREBASE_AUTH_DOMAIN,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
};

export { getApp, getApps, FIREBASE_CONFIG, initializeApp, getFirestore };
