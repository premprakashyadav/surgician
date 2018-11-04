import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-visitors',
  templateUrl: 'visitors.html',
})
export class VisitorsPage {
  currentImage = null;
  regData = { name:'', mobile: '', address: '', currentImage:'' };
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera, private emailComposer: EmailComposer) {
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
 
  sendEmail() {
    let email = {
      to: 'prem.sy89@gmail.com',
      cc: 'drratnakaryadav@gmail.com',
      attachments: [
        this.currentImage
      ],
      subject: 'Prescription',
      body: '<h4>Find Below Attachment</h4><br/>' +'<h5>Name:</h5>' + this.regData.name + '<br/><h5>Mobile:</h5>' + this.regData.mobile + '<br/><h5>Address:</h5>' + this.regData.address,
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitorsPage');
  }

}
