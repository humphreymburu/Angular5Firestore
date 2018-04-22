import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from './user.model';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { NotifyService } from './notify.service';



@Injectable()
export class AuthService {
    
   //currentUser: IUser | null;
    //authState: any = null;

    user: Observable<IUser | null>;

    
    constructor(private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private router: Router,
      private notify: NotifyService) {

      this.user = this.afAuth.authState
        .switchMap((user) => {
          if (user) {
              return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
                } else {
                  return Observable.of(null);
                }
            });
      }



    // Returns current user data
  get currentUser(): any {
     return this.user;
  }


  
    //// Social Auth ////
    
      googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider()
        return this.socialSignIn(provider);
      }
    
      facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider()
        return this.socialSignIn(provider);
      }

    
      private socialSignIn(provider: firebase.auth.AuthProvider) {
        return this.afAuth.auth.signInWithPopup(provider)
          .then((credential) =>  {
            this.notify.update('Welcome to Firestarter!!!', 'success');
            return this.updateUserData(credential.user);
          })
          .catch(error => console.log(error));
      }

     //// Email/Password Auth ////
  emailSignUp(email:string, password:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      this.notify.update('Welcome to Firestarter!!!', 'success')
      return this.updateUserData(user); // if using firestore
    })
      .catch(error => console.log(error));
  }

  emailLogin(email:string, password:string) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
        this.notify.update('Welcome to Tukio', 'success')
        return this.updateUserData(user); // if using firestore
       })
       .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var fbauth = firebase.auth();

    return fbauth.sendPasswordResetEmail(email)
      .then(() => console.log("Password update email sent", "info"))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////
  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }


  //// Helpers ////
  public updateUserData(user: IUser) {
  // Writes user name and email to realtime db
  // useful if your app displays information about users or for admin features
  const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`users/${user.uid}`);

  const data: IUser = {
    uid: user.uid,
    email: user.email || null,
    displayName: user.displayName || 'nameless user',
    photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
    firstName: user.firstName,
    lastName: user.lastName
  };
  
  return userRef.set(data);

  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }



}

    


  

    
