import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-partner',
  templateUrl: 'partner.html',
})
export class PartnerPage {
  currentImage = null;
  regData = { name:'', mobile: '', address: '' };
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
    let email = {
      to: 'prem.sy89@gmail.com',
      cc: 'drratnakaryadav@gmail.com',
      attachments: [
        this.currentImage
      ],
      subject: 'Details for Become a Partner',
      body: '<h4>Find Below Details</h4><br/>' +'<h5>Name:' + this.regData.name + '</h5><br/><h5>Mobile:' + this.regData.mobile + '</h5><br/><h5>Address:' + this.regData.address + '</h5>',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }
 

}
