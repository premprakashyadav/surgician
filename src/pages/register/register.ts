import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {


	@ViewChild('username') user;
	@ViewChild('password') password;

  constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  registerUser() {
    this.fire.auth.createUserWithEmailAndPassword(this.user.value + '@surgician.com', this.password.value)
    .then(data => {
      console.log('got data ', data);
      this.alert('Registered!');
      this.navCtrl.setRoot(LoginPage);
    })
    .catch(error => {
      console.log('got an error ', error);
      this.alert(error.message);
    });
  	console.log('Would register user with ', this.user.value, this.password.value);
  }

}
