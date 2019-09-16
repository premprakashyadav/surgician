import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { RestServiceProvider } from '../../services/rest-service/rest-service';
import {config} from '../../shared/config';
import {ToastProvider} from '../../services/toast/toast';
import { Network } from '@ionic-native/network';
import { EmailComposer } from '@ionic-native/email-composer';
import {AlertProvider } from '../../services/alert/alert';
import {MyApp} from '../../app/app.component';
import { CallNumber } from '@ionic-native/call-number/ngx';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public showPasswordText= false;
  public loading: any;
  public loginData:any = {};
  public loaderShow : boolean = true;
constructor(public navCtrl: NavController, 
            public navParams: NavParams, 
            public restServiceProvider: RestServiceProvider,
            public loadingCtrl: LoadingController, 
            private toastCtrl: ToastController,
            public toastProvider : ToastProvider,
            public network: Network,
            public alertProvider : AlertProvider,
            public myApp : MyApp,
            private emailComposer: EmailComposer,
            private callNumber: CallNumber
          ) {
}


callJoint(telephoneNumber) {
  this.callNumber.callNumber(telephoneNumber, true);
  
//   this.callNumber.isCallSupported()
// .then(function (response) {
//     if (response == true) {
//       this.callNumber.callNumber(telephoneNumber, true);
//     }
//     else {
//       this.toastProvider.presentToastTop('Call not supported so you can dial on 09987087087');
//     }
// });
}

 emailIn(){
  let email = {
    to: 'drratnakaryadav@gmail.com',
    subject: 'Surgician Support',
    body: '',
    isHtml: true
  };
  this.emailComposer.open(email);
 }


 register(){
   //Login page link
   this.navCtrl.push('RegisterPage');
 }
 
 forgotPassword(){
    this.navCtrl.push('ForgotpasswordPage');
 }
 
  doLogin() {
    if(this.loginData){
     if(this.loginData.phone == '' || this.loginData.phone == undefined 
     || this.loginData.password == '' || this.loginData.password == undefined){
       this.toastProvider.presentToastTop("All field required");
     }
     else{
    
   if(this.network.type === 'none'){
     this.alertProvider.showWithTitle('No Internet Connection', 'Please connect internet to start')
   }
   else{
     this.loaderShow = true;
    this.restServiceProvider.postService(config['login'], this.loginData).subscribe(result => {
     this.loaderShow = false;   
     if(result.Response.status == 'success'){
           localStorage.setItem('api_key', result.Data.api_key)
           localStorage.setItem('userID', result.Data.userID)

         console.log(result.loginData);
         localStorage.setItem("isLogin" , "Yes")
         this.myApp.getUserInfo();
          this.navCtrl.setRoot('LoggedinPage', {data :  this.loginData});
         
         }
         else{ 
           this.toastProvider.presentToastTop(result.Error.error_msg);
         }    
         }, (err) => {
           this.toastProvider.presentToastTop(err);
           this.loaderShow = false;  
           });
         }
       }
       }
 }
 
 showLoader(){
   this.loading = this.loadingCtrl.create({
       content: 'Authenticating...'
   });
   this.loading.present();
 }
 
  

 ionViewDidLoad() {
   console.log('ionViewDidLoad SigninPage');
 }
 
 

}