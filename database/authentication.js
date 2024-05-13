import firebase from './firebase';

export default class Authentication {
  static login = (email, password) => {
    try{
      return firebase.auth().signInWithEmailAndPassword(email, password);
    }
    catch(erro){
      alert(erro)
    }
  }
  
  static registerUser =  (email, password) => {
    try{
      return  firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    catch(erro){
      alert(erro)
    }
    
  };
 
  static getCurrentUser =  () => {
    try{
      return  firebase.auth().currentUser;
    }
    catch(erro){
      alert(erro)
    }
  };
}