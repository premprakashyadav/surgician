import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterPage } from '../register/register';
import { LoggedinPage } from '../loggedin/loggedin';
import { EmailComposer } from '@ionic-native/email-composer';
import { Network } from '@ionic-native/network';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loading: any;
  public loaderShow : boolean = false;
  responseData : any;
  userData = {"username": "","password": ""};
  showPasswordText= false;

  constructor(public navCtrl: NavController,
    private emailComposer: EmailComposer,
     public authService: AuthService,
      public navParams: NavParams,
       public formBuilder: FormBuilder,
       public alertCtrl: AlertController,
       public network: Network,
        public loadingCtrl: LoadingController) {
   }

  signup(){
    if(this.userData){
      if(this.userData.username == '' || this.userData.username == undefined 
      || this.userData.password == '' || this.userData.password == undefined){
        let alert = this.alertCtrl.create({
          title: 'Eror!',
          subTitle: 'All fields are required.',
          buttons: ['Ok']
        });
        alert.present();
      }
      else{
     
    if(this.network.type === 'none'){
      let alert = this.alertCtrl.create({
        title: 'No Internet Connection',
        subTitle: 'Please connect internet to start',
        buttons: ['Ok']
      });
      alert.present();
    }
    else{
      this.loaderShow = true;
      this.authService.postData(this.userData,'login').then(result => {
      this.loaderShow = false;   
      this.responseData = result;
     if(this.responseData.userData){
      let alert = this.alertCtrl.create({
        title: 'Welcome to Surgician',
        subTitle: 'You are successfully logged in Surgician.',
        buttons: ['Ok']
      });
      alert.present();
     localStorage.setItem('userData', JSON.stringify(this.responseData));
     this.navCtrl.push(LoggedinPage);
          
				  }
				  else{ 
            let alert = this.alertCtrl.create({
              title: 'Welcome to Surgician',
              subTitle: 'You are not registered.',
              buttons: ['Ok']
            });
            alert.present();
				  }    
          }, (err) => {
            let alert = this.alertCtrl.create({
              title: 'Error!',
              subTitle: err,
              buttons: ['Ok']
            });
            alert.present(); 
            });
          }
        }
        }

 }


 emailIn(){
  let email = {
    to: 'prem.sy89@gmail.com',
    cc: 'drratnakaryadav@gmail.com',
    subject: 'Surgician Support',
    body: '',
    isHtml: true
  };
  this.emailComposer.open(email);
 }


 register(){
   //Login page link
   this.navCtrl.push(RegisterPage);
 }
}