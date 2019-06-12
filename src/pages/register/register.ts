import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';
import { Network } from '@ionic-native/network';
import { EmailComposer } from '@ionic-native/email-composer';

/*
  Generated class for the Register page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public loaderShow : boolean = false;
  responseData : any;
  userData = {username: "",password: "", phone: "",email: ""};

  constructor(public navCtrl: NavController,
     public authService: AuthService, 
     public navParams: NavParams, 
     public formBuilder: FormBuilder,
     public alertCtrl: AlertController,
     public loadingCtrl: LoadingController,
     private emailComposer: EmailComposer,
    public network: Network,
            
      ) {
   }

  register(){
    if(this.userData){
      if(this.userData.username == '' || this.userData.username == undefined 
      || this.userData.email == '' || this.userData.email == undefined
      || this.userData.password == '' || this.userData.password == undefined
      || this.userData.phone == '' || this.userData.phone == undefined){
        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'All field required',
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
      this.authService.postData(this.userData,'signup').then(result => {
        this.loaderShow = false;
        this.responseData = result;
        if(this.responseData.userData){
          
            let alert = this.alertCtrl.create({
              title: 'Welcome to Surgician',
              subTitle: 'You are successfully registered.',
              buttons: ['Ok']
            });
            alert.present();
           localStorage.setItem('userData', JSON.stringify(this.responseData));
           this.navCtrl.push(LoginPage);
            }
				  else{ 
            let alert = this.alertCtrl.create({
              title: 'Welcome to Surgician',
              subTitle: 'You are already registered.',
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

 login(){
   //Login page link
   this.navCtrl.push(LoginPage);
 }
}