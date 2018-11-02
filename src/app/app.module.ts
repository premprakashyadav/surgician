import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { VerificationPage } from '../pages/verification/verification';


export const firebaseConfig = {
  apiKey: "AIzaSyCKm86zTFd0KOkpcYYyJtG7jTeyzctSlHU",
  authDomain: "com.surgician.surgician",
  databaseURL: "https://surgician-73df1.firebaseio.com",
  projectId: "surgician-73df1",
  storageBucket: "surgician-73df1.appspot.com",
  messagingSenderId: "708292051091"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    VerificationPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
