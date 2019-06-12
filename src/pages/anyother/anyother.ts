import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';



@IonicPage()
@Component({
  selector: 'page-anyother',
  templateUrl: 'anyother.html',
})
export class AnyotherPage {
  currentImage = null;
  regData = { name:'', mobile: '', address: '' };
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,private camera: Camera, private emailComposer: EmailComposer) {
  }
 
  logOut(){
  }
 


  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

 
  sendEmail() {
    if(this.regData.mobile.length < 10)
    {
      this.alert('Please Enter 10 Digit Mobile Number');
      return false;
    }
    else{
    let email = {
      to: 'prem.sy89@gmail.com',
      cc: 'drratnakaryadav@gmail.com',
      subject: 'Any Other Support',
      body: '<h4>Find Below Details</h4><br/>' +'<h5>Name:' + this.regData.name + '</h5><br/><h5>Mobile:' + this.regData.mobile + '</h5><br/><h5>Comments:' + this.regData.address + '</h5>',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }
}

}
