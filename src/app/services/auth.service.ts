import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { FirebaseAuth } from '@firebase/auth-types';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  profile: firebase.User = null;

  constructor(private fireauth: AngularFireAuth) {
    this.user = fireauth.authState;
    this.user.subscribe((user) => {
      if (user) {
        this.profile = user;
        console.log(this.profile);
      }
    });
  }

  isLoggedIn(): Observable<firebase.User> {
    return this.user;
  }

  currentUser() {
    if (this.isLoggedIn()) {
      return this.profile.email.replace(/@demo-site\.com$/, '');
    }
    return '';
  }

  login(credential) {
    return this.fireauth.auth.setPersistence('session').then(() => {
      return this.fireauth.auth.signInWithEmailAndPassword(credential.username + '@demo-site.com', credential.password);
    });
  }

  logout() {
    return this.fireauth.auth.signOut();
  }

}
