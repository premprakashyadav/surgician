import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController, Nav } from 'ionic-angular';
import { RestServiceProvider } from '../../services/rest-service/rest-service';
import {config} from '../../shared/config';
import {ToastProvider} from '../../services/toast/toast';
import { Network } from '@ionic-native/network';
import {AlertProvider } from '../../services/alert/alert';

/*
  Generated class for the Resetpwd page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-resetpwd',
  templateUrl: 'forgotpassword.html'
})
export class ForgotpasswordPage {
  public loading: any;
  public loginData: any = {};
  public loaderShow : boolean = false;
 
   constructor(public navCtrl: NavController, 
     public navParams: NavParams, 
     public restServiceProvider: RestServiceProvider,
     public loadingCtrl: LoadingController, 
     private toastCtrl: ToastController,
     public toastProvider : ToastProvider,
     public network: Network,
     public nav: Nav,
     public alertProvider : AlertProvider) {
   }
   
   register(){
    //Login page link
    this.navCtrl.push('RegisterPage');
  }
   login(){
   this.navCtrl.push('LoginPage');  
   }
  
   logout() {
    localStorage.clear();
    setTimeout(() => 
    this.nav.setRoot("LoginPage"),
     1000);
  }
    forgotPassword() {
     if(this.loginData){
       if(this.loginData.phone == '' || this.loginData.phone == undefined 
       || this.loginData.password == '' || this.loginData.password == undefined){
         this.toastProvider.presentToastTop("All field required");
       }
      
       else{
      if(this.loginData.password != this.loginData.confirmpassword ){
       this.toastProvider.presentToastTop("Password not matched.");
      }
    else{
     if(this.network.type === 'none'){
       this.alertProvider.showWithTitle('No Internet Connection', 'Please connect internet to start')
     }
     else{
       this.loaderShow = true;
      this.restServiceProvider.postService(config['forgotPwd'], this.loginData).subscribe(result => {
       this.loaderShow = false;  
       if(result.Response.status == 'success'){
           this.navCtrl.push('OtpPage', {data :  this.loginData});
           }
           else{ 
             this.toastProvider.presentToastTop(result.Error.error_msg);
           }    
           
   }, (err) => {
     this.loaderShow = false;  
     this.toastProvider.presentToastTop(err);
     });
   }
 }
   //
 }
     }
   
   }
   
 
  
   
 
 }
 