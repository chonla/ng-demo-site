import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { FirebaseAuth } from '@firebase/auth-types';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  profile: firebase.User = null;

  constructor(private fireauth: AngularFireAuth) {
    this.user = fireauth.authState;
    this.user.subscribe((user) => {
      if (user) {
        this.profile = user;
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
    return this.fireauth.auth.setPersistence(environment.authen.persistence).then(() => {
      return this.fireauth.auth.signInWithEmailAndPassword(credential.username, credential.password);
    });
  }

  create(credential): Promise<any> {
    return this.fireauth.auth.createUserWithEmailAndPassword(credential.username, credential.password);
  }

  logout() {
    return this.fireauth.auth.signOut();
  }

  leave(): Promise<any> {
    return this.fireauth.auth.currentUser.delete();
  }

}
