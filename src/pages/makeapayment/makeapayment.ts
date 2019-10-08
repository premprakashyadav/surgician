import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Nav } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-makeapayment',
  templateUrl: 'makeapayment.html',
})
export class MakeapaymentPage {
  email: any;
  rzp1: any;
  userDetails: any;
  currentImage = null;
  regData = { name: '', mobile: '', address: '', email: '', amount: null };
  constructor(private alertCtrl: AlertController, public nav: Nav, public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private emailComposer: EmailComposer) {
    //this.email = fire.auth.currentUser.email;
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.userDetails = localStorage.getItem('profileData');
      this.regData.name = JSON.parse(this.userDetails).name;
      this.regData.mobile = JSON.parse(this.userDetails).phone;
      this.regData.address = JSON.parse(this.userDetails).address;
      this.regData.email = JSON.parse(this.userDetails).email;
    }, 1000);
  }




  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }


  sendEmail() {
    let geten: number = this.regData.amount * 100;
    if (this.regData.mobile.length < 10) {
      this.alert('Please Enter 10 Digit Mobile Number');
      return false;
    }
    else {
      var options = {
        description: 'Credits to Surgician.com',
        name: 'Surgician.com',
        //image: 'assets/imgs/logo.png',
        currency: 'INR',
        key: 'rzp_live_SbhTbvL3OJNrhK',
        amount: geten,
        prefill: {
          contact: this.regData.mobile,
          name: this.regData.name,
          email: this.regData.email
        },
        modal: {
          ondismiss: function () {
            alert('dismissed')
          }
        }


      }

      var successCallback = (payment_id) => {
        this.alert('Payment done successfully and transaction id:' + payment_id);
        this.regData.amount = null;
        //Navigate to another page using the nav controller
        //this.navCtrl.setRoot(SuccessPage)
        //Inject the necessary controller to the constructor
      };

      var cancelCallback = (error) => {
        this.alert('Payment not done successfully and error are:' + error.description + ' (Error ' + error.code + ')' );
        this.regData.amount = null;
        //Navigate to another page using the nav controller
        //this.navCtrl.setRoot(ErrorPage)
      };

      RazorpayCheckout.open(options, successCallback, cancelCallback);
      
    }
  }

  logout() {
    localStorage.clear();
    setTimeout(() =>
      this.nav.setRoot("LoginPage"),
      1000);
  }

}

