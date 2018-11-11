import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-onlineappointment',
  templateUrl: 'onlineappointment.html',
})
export class OnlineappointmentPage {
  currentImage = null;
  regData = { name:'', mobile: '', address: '', docname:'', special:'', docno:'', myDate:'' };
  constructor(private fire: AngularFireAuth,private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,private camera: Camera, private emailComposer: EmailComposer) {
  }
 
  logOut(){
    this.fire.auth.signOut();
	this.navCtrl.setRoot(HomePage);
  }
 


  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

 
  sendEmail() {
    if(this.regData.mobile.length < 10 || this.regData.docno.length < 10)
    {
      this.alert('Please Enter 10 Digit Mobile Number');
      return false;
    }
    else{
    let email = {
      to: 'prem.sy89@gmail.com',
      cc: 'drratnakaryadav@gmail.com',
      subject: 'Details for Online Appointment',
      body: '<h4>Find Below Details</h4><br/>' +'<h5>Name:' + this.regData.name + '</h5><br/><h5>Mobile:' + this.regData.mobile + '</h5><h5>Doctor Name:' + this.regData.docname + '</h5><br/><h5>Specialization:' + this.regData.special + '</h5></br/><h5>Doctor Contact No:' + this.regData.docno + '</h5><br/><h5>Appointment Date & Time:' + this.regData.myDate + '</h5><br/><h5>Comments:' + this.regData.address + '</h5>',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }
}

}
