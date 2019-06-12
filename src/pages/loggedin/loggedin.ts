import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import * as $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})
export class LoggedinPage {
  showmodal: boolean = false;
  rootPage;
  userDetails: any;
  responseData: any;

  userPostData = { "user_id": "", "token": "" };


  constructor(public navCtrl: NavController, public app: App, public navParams: NavParams, private auth: AuthService) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    $('#offline0Field').val(this.userDetails.user_id);
  }



  backToWelcome() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  logout() {
    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 1000);
  }

  uploadPrescription() {
    this.navCtrl.push('UploadprescriptionPage');
  }
  dignostics() {
    this.showmodal = !this.showmodal;

  }

  close() {
    this.showmodal = !this.showmodal;
  }

  visitLab() {
    this.navCtrl.push('VisitorsPage');
  }

  homeService() {
    this.navCtrl.push('HomeservicePage');
  }
  healthCheck() {
    this.navCtrl.push('HealthcheckPage');
  }

  healthCare() {
    this.navCtrl.push('HomehealthcarePage');
  }
  requestCall() {
    this.navCtrl.push('RequestcallPage');
  }
  secondOpenion() {
    this.navCtrl.push('SecondopenionPage');
  }
  onlineAppoint() {
    this.navCtrl.push('OnlineappointmentPage');
  }
  anyOther() {
    this.navCtrl.push('AnyotherPage');
  }
  ourPartner() {
    this.navCtrl.push('PartnerPage');
  }

  doctor() {
    this.navCtrl.push('DoctorPage');
  }

  hospital() {
    this.navCtrl.push('HospitalPage');
  }

  user() {
    this.navCtrl.push('UserPage');

  }

  onlinepayment() {
    this.navCtrl.push('MakeapaymentPage');
  }
  chat() {
    this.navCtrl.push('ChatpagePage');
  }
}
