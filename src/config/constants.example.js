import firebase from 'firebase'

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const BASE_URL = "http://localhost:3001"
