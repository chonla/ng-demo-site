import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { FirebaseAuth } from '@firebase/auth-types';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private fireauth: AngularFireAuth) {
    this.user = fireauth.authState;
  }

  login(credential) {
    return this.fireauth.auth.signInWithEmailAndPassword(credential.username + '@demo-site.com', credential.password);
  }

  logout() {
    return this.fireauth.auth.signOut();
  }

}
