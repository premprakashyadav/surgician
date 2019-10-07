import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { MyApp } from './app.component';
import { Network } from '@ionic-native/network';

import { config } from '../shared/config';
import { IonicStorageModule } from '@ionic/storage';
import { Crop } from '@ionic-native/crop';


//Providers
import { RestServiceProvider } from '../services/rest-service/rest-service';
import { ConfigProvider } from '../services/config/config';
import { SharedDataProvider } from '../services/shared-data/shared-data';
import { LoadingProvider } from '../services/loading/loading';
import { AlertProvider } from '../services/alert/alert';
import { ToastProvider } from '../services/toast/toast';
import { ProcessHttpmsgProvider } from '../services/process-httpmsg/process-httpmsg';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

// import { Media } from '@ionic-native/media/ngx';
// import { File } from '@ionic-native/file/ngx';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgxErrorsModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    IonicSelectableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: 'config', useValue: config},
    RestServiceProvider,
    ConfigProvider,
    SharedDataProvider,
    LoadingProvider,
    AlertProvider,
    ToastProvider,
    Camera,
    ProcessHttpmsgProvider,
    EmailComposer,
    ImagePicker,
    Crop,
    PhotoViewer,
    Base64,
    CallNumber,
    Keyboard,
    Media,
    File,
    SpeechRecognition
  ]
})
export class AppModule {}
