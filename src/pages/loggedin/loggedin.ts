import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Nav } from 'ionic-angular';
import * as $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})
export class LoggedinPage  {
  showmodal: boolean = false;
  rootPage;
  userDetails: any;
  userName:any = '';
  responseData: any;

  userPostData = { "user_id": "", "token": "" };


  constructor(public navCtrl: NavController, public app: App, public navParams: NavParams, public nav: Nav) {
    
  }
  ionViewDidLoad() {
    
    setTimeout(() => {
      this.userDetails = localStorage.getItem('profileData');
      if(this.userDetails) {
        this.userName = JSON.parse(this.userDetails);
        this.userName = this.userName.name;
      }
    },1000);
  
    }
    medicalRecords() {
      this.navCtrl.push('MedicalRecordsPage');
    }

  backToWelcome() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  orderHistory() {
    this.navCtrl.push('OrderhistoryPage');
  }

  logout() {
    localStorage.clear();
    setTimeout(() => 
    this.nav.setRoot("LoginPage"),
     1000);
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

  postOffer() {
    this.navCtrl.push('PostOfferPage');
  }

  oneClick() {
    this.navCtrl.push('OneClickPage');
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
 
}
