import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public nav:Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  logout() {
    localStorage.clear();
    setTimeout(() => 
    this.nav.setRoot("LoginPage"),
     1000);
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

}
