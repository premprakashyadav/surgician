import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LoggedinPage } from '../pages/loggedin/loggedin';
import { RegisterPage } from '../pages/register/register';
import { UploadprescriptionPage } from '../pages/uploadprescription/uploadprescription';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';



const firebaseAuth = {
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
    LoginPage,
    RegisterPage,
    LoggedinPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    LoggedinPage,
    UploadprescriptionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImagePicker,
    Base64
  ]
})
export class AppModule {}
