import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PostService } from './post.service';
import { auth } from 'firebase/app';

import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentAdmin: any = {};
  hasError = false;
  errorCode = '';
  errorMessage = '';
  constructor(
    public afAuth: AngularFireAuth,
    public postService: PostService,
  ) { }

  // Check if user is logged in
  // @returns boolean
  loggedIn() {
    return this.afAuth.authState.pipe(map(user => !!user));
  }

  // Login with simple email and password
  async loginWithEmail(email: string, password: string, author?: string) {
    return await this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(onSuccess => this.getAdminData(author))
      .catch(error => {
        // console.log(error);
      });
  }

  // SignOut
  signOut() {
    return this.afAuth.auth.signOut();
  }

  getAdminData(author: string) {
    this.currentAdmin = this.postService.getAdmin(`${author}`);
    this.postService.adminAccount$;
    return this.currentAdmin;
  }
}
