import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  loginWithEmail(credentials) {
    console.log("Sign in with email");
    return this.afAuth.auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  register(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  logOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  getUser(): firebase.User {
    return this.user;
  }

  getUID(): string {
    if (this.user !== null) { return this.user.uid; }
  }  
}
