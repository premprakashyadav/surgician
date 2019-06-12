import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

/*
  Generated class for the Resetpwd page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-resetpwd',
  templateUrl: 'forgotpassword.html'
})
export class ForgotpasswordPage {


  constructor(public navCtrl: NavController, public authService: AuthService, public navParams: NavParams, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
   
  }


  resetPwd() {
 
  }

}