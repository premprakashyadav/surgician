import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-makeapayment',
  templateUrl: 'makeapayment.html',
})
export class MakeapaymentPage {
  rzp1:any;
    currentImage = null;
    regData = { name:'', mobile: '', address: '', amount: null };
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
     let geten: number = this.regData.amount * 100;
      if(this.regData.mobile.length < 10)
      {
        this.alert('Please Enter 10 Digit Mobile Number');
        return false;
      }
      else{
        var options = {
          description: 'Credits to Surgician.com',
          name:'Surgician.com',
          image: 'http://www.surgician.com/images/logo.png',
          currency: 'INR',
          key: 'rzp_live_SbhTbvL3OJNrhK',
          amount: geten,
          prefill: {
            contact: this.regData.mobile,
            name: this.regData.name
          }
         
       
      }
      var successCallback = function(success) {
        alert('payment_id: ' + success.razorpay_payment_id)
        var orderId = success.razorpay_order_id
        var signature = success.razorpay_signature
      }
      
      var cancelCallback = function(error) {
        alert(error.description + ' (Error '+error.code+')')
      }
      this.rzp1.on('payment.success', successCallback)
      this.rzp1.on('payment.cancel', cancelCallback)
      this.rzp1 = new Razorpay(options);
      this.rzp1.open();
    }
  }
  
  }
  
