import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
//import { Base64 } from '@ionic-native/base64';

/**
 * Generated class for the UploadprescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-uploadprescription',
  templateUrl: 'uploadprescription.html',
})
export class UploadprescriptionPage {
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
      subject: 'Order for Medicine',
      body: '<h4>Find Below Details:</h4><br/>' +'<h5>Name:' + this.regData.name + '</h5><br/><h5>Mobile:' + this.regData.mobile + '</h5><br/><h5>Address:' + this.regData.address + '</h5>',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitorsPage');
  }

}
