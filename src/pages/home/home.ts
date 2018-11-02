import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
verificationId:any;
code:string='';
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  send(){
    (<any>window).FirebasePlugin.verifyPhoneNumber(9987557259, 60, (credential) => {
    alert("SMS send successfully");
      console.log(credential);

      this.verificationId = credential.verificationId;

    },(error) => {
      console.error(error);
    });
  }

  verify(){
    let signInCredential= firebase.auth.PhoneAuthProvider.credential(this.verificationId,this.code);
    firebase.auth.signInWithCredential(signInCredential).then((info) =>{
      console.log(info);
    }, (error) => {
      console.error(error);
    });
  }



  


}
