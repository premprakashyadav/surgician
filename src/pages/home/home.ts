import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  // signIn() {
  //   // add a local variable to store navCtrl object
  //   let thatNavCtrl = this.navCtrl;
  //   //Step 1 — Pass the mobile number for verification
  //   let tell = "+" + this.phone;
  //   window.FirebasePlugin.verifyPhoneNumber(tell, 60, function (credential) {
  //     let verificationId = credential.verificationId;
  //     //This is STEP 2 — passing verification ID to verify Page
  //     thatNavCtrl.push(VerificationPage, { verificationid: verificationId, phone: phoneNumber });
  //   }, (error) => {
  //     console.error(error);
  //   });
  // }

}
