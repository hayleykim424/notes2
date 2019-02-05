import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  uid:string;
  constructor( private afAuth:AngularFireAuth ) { 

  }

  //sign up method
  async signUp( email, password ){ //createUserWithEmailAndPassword is a firebase method
    /*this.afAuth.auth.createUserWithEmailAndPassword( email, password )
    .catch( (error)=> {
      //check what error
      return this.handleSignUpError(error);
    } );*/
    try{
      let userData = await this.afAuth.auth.createUserWithEmailAndPassword( email, password);
      this.uid = this.afAuth.auth.currentUser.uid;
      return { success: true, uid: this.uid };

    }
    catch(error){
      return {success: false, error: this.handleSignUpError};
    }

  }
  handleSignUpError( error ){
    let message = error.message;
    console.log(message);

    switch( message ){
      case 'auth/email-already-in-use' :
        return 'email already used';

      case 'auth/invalid-email' :
        return 'please use a valid email address';

      case 'auth/operation-not-allowed' :
        return 'sign up is not enabled at the moment'

      case 'auth/weak-password' :
        return 'password is weak';

      default:
        return null;

    }
  }
  //sign in
  async signIn(email, password){
    try{
      let userData = await this.afAuth.auth.signInWithEmailAndPassword( email, password);
      this.uid = this.afAuth.auth.currentUser.uid;
      return { success: true, uid: this.uid, email: email };
    }
    catch(error){
      return { success: false, error: error.message };
    }
  }
  async signOut() {
    try {
    await this.afAuth.auth.signOut();
    return {success: true};
  }
  catch(error){
    return {success: false};
  }


  }
}
