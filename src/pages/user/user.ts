import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  currentImage = null;
  regData = { name:'', mobile: '', address: '' };
  constructor(private fire: AngularFireAuth,private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,private camera: Camera, private emailComposer: EmailComposer) {
  }
 
  logOut(){
    this.fire.auth.signOut();
	this.navCtrl.setRoot(HomePage);
  }
 
  captureImage() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
    }
 
    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = imageData;
    }, (err) => {
      // Handle error
      console.log('Image error: ', err);
    });
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
      subject: 'Details of Patient',
      body: '<h4>Find Below Details</h4><br/>' +'<h5>Name:' + this.regData.name + '</h5><br/><h5>Mobile:' + this.regData.mobile + '</h5><br/><h5>Comments:' + this.regData.address + '</h5>',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }
 

}
