import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  login(credential) {
    if (credential.username === 'demouser' &&
    credential.password === 'demopassword') {
      return true;
    }
    return false;
  }

}
