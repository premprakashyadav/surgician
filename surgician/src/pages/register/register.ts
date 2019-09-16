
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { RestServiceProvider } from '../../services/rest-service/rest-service';
import {config} from '../../shared/config';
import {ToastProvider} from '../../services/toast/toast';
import { Network } from '@ionic-native/network';
import {AlertProvider } from '../../services/alert/alert';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number/ngx';

/*
  Generated class for the Register page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public showPasswordText= false;
  public regData: any = {};
  public loaderShow : boolean = false;
  public term = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public restServiceProvider: RestServiceProvider,
    public loadingCtrl: LoadingController, 
    private toastCtrl: ToastController,
    public toastProvider : ToastProvider,
    public network: Network,
    public alertProvider : AlertProvider,
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


 login() {
  this.navCtrl.push('LoginPage');
 }
 forgotPassword(){
    this.navCtrl.push('ForgotpasswordPage');
 }

 terms() {
    this.navCtrl.push('TermsPage');
 }
 
 doSignup() {
   if(this.term == false)
   {
    this.toastProvider.presentToastTop("Please Checked the terms & condition"); 
   }
    if(this.regData){
     if(this.regData.name == '' || this.regData.name == undefined 
     || this.regData.email == '' || this.regData.email == undefined
     || this.regData.password == '' || this.regData.password == undefined
     || this.regData.phone == '' || this.regData.phone == undefined){
       this.toastProvider.presentToastTop("All field required");
     }
     else{
    
   if(this.network.type === 'none'){
     this.alertProvider.showWithTitle('No Internet Connection', 'Please connect internet to start')
   }
   else{
     this.loaderShow = true;
     this.restServiceProvider.postService(config['register'], this.regData).subscribe(result => {
       this.loaderShow = false;
       if(result.Response.status == 'success'){
         console.log(result.loginData);
         localStorage.setItem("token", result.Data.api_key);
         this.navCtrl.push('OtpPage', {data :  this.regData});
         }
         else{ 
           this.toastProvider.presentToastTop(result.Error.error_msg);
         }    
         }, (err) => {
           this.loaderShow = false;
           this.toastProvider.presentToastTop(err)
           });
         }
       }
       }
 }
 

  

 ionViewDidLoad() {
   console.log('ionViewDidLoad SigninPage');
 }
 
 

}