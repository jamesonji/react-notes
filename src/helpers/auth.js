import firebase from 'firebase';
import { ref, firebaseAuth} from '../config/constants';

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
}

export function facebookLogin (){
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  
  return firebaseAuth().signInWithPopup(provider);
}

export function googleLogin (){
  var provider = new firebase.auth.GoogleAuthProvider();
  return firebaseAuth().signInWithPopup(provider); 
}

export function githubLogin (){
  var provider = new firebase.auth.GithubAuthProvider();
  return firebaseAuth().signInWithPopup(provider);
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
         .then((data)=> {
           console.log(data)
           console.log(data.email)
         })
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}