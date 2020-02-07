import {
  NgModule,
  ErrorHandler,
  Injectable,
  InjectionToken,
} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CookieService } from 'ngx-cookie-service';


import { AuthService } from './auth.service';
// import { UserService } from './user.service';
// import { ShopService } from './shop.service';
// import { ToastService } from './toast.service';

import { environment } from '../../environments/environment';
import { PostService } from './post.service';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [CookieService, AuthService, PostService],
})
export class CoreModule { }
