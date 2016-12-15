import React from 'react';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import firebase from 'firebase'

const env = runtimeEnv();

const config = {
  apiKey: env.REACT_APP_FIREBASE_API_KEY,
  authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: env.REACT_APP_FIREBASE_DATABASE_URL,
}


firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const BASE_URL = env.REACT_APP_BASE_URL