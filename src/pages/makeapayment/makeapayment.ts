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
  email:any;
  rzp1:any;
  userDetails: any;
    currentImage = null;
    regData = { name:'', mobile: '', address: '', email:'', amount: null };
    constructor(private alertCtrl: AlertController,public nav:Nav, public navCtrl: NavController, public navParams: NavParams,private camera: Camera, private emailComposer: EmailComposer) {
      //this.email = fire.auth.currentUser.email;
    }

    ionViewDidLoad() {
    this.userDetails = localStorage.getItem('profileData');
    this.regData.name = JSON.parse(this.userDetails).name;
    this.regData.mobile = JSON.parse(this.userDetails).phone;
    this.regData.address = JSON.parse(this.userDetails).address;
    this.regData.email = JSON.parse(this.userDetails).email;
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
          image: 'assets/imgs/logo.png',
          currency: 'INR',
          key: 'rzp_live_SbhTbvL3OJNrhK',
          amount: geten,
          prefill: {
            contact: this.regData.mobile,
            name: this.regData.name,
            email:this.regData.email
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
      
      this.rzp1 = new Razorpay(options);
      this.rzp1.open();
      this.rzp1.on('payment.success', successCallback)
      this.rzp1.on('payment.cancel', cancelCallback)
    }
  }

  logout() {
    localStorage.clear();
    setTimeout(() => 
    this.nav.setRoot("LoginPage"),
     1000);
  }
  
  }
  
