import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})
export class LoggedinPage {

  email: string;
  showmodal : boolean= false;

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
 	this.email = fire.auth.currentUser.email;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoggedinPage');
  }

  logOut(){
    this.fire.auth.signOut();
	this.navCtrl.setRoot(HomePage);
  }

  uploadPrescription() {
    this.navCtrl.push('UploadprescriptionPage');
  }
  dignostics(){
this.showmodal = !this.showmodal;

}

close(){
  this.showmodal = !this.showmodal;
}

  visitLab(){
    this.navCtrl.push('VisitorsPage');
  }

  homeService(){
    this.navCtrl.push('HomeservicePage');
  }
  healthCheck(){
    this.navCtrl.push('HealthcheckPage');
  }
  requestCall(){
    this.navCtrl.push('RequestcallPage');
  }

}
