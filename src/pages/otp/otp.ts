import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { RestServiceProvider } from '../../services/rest-service/rest-service';
import {config} from '../../shared/config';
import {ToastProvider} from '../../services/toast/toast';
import { Network } from '@ionic-native/network';
import {AlertProvider } from '../../services/alert/alert';

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {
	public loaderShow : boolean = false;
  public otp;
  public loading;
  public parramsData : any = {};
 public regData : any = {};
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public restServiceProvider: RestServiceProvider,
    public loadingCtrl: LoadingController, 
    private toastCtrl: ToastController,
    public toastProvider : ToastProvider,
    public network: Network,
    public alertProvider : AlertProvider
  ) {
    this.parramsData = this.navParams.get('data');
    this.regData = this.navParams.get('data')
  }


 otpVerify() {
  if(this.otp){
  let otpData = {
    "phone" : this.parramsData.phone,
    "otp" : this.otp
  }
  if(this.network.type === 'none'){
    this.alertProvider.showWithTitle('No Internet Connection', 'Please connect internet to start')
  }
  else{
    this.loaderShow = true;
      this.restServiceProvider.postService(config['verifyOTP'],otpData).subscribe(result => {
        this.loaderShow = false;
        if(result.Response.status == 'success'){
				  console.log(result.regData);
				   this.navCtrl.setRoot('LoginPage');
				  }
          else{ 
            this.toastProvider.presentToastTop(result.Error.error_msg);
				  }    
          }, (err) => {
            this.toastProvider.presentToastTop(err);
            this.loaderShow = false;
            });
          }
        }
 }
  
  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }
  
   presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
	console.log(this.navParams.get('data').phone);
  }
  
  resend(){
   if(this.network.type === 'none'){
     this.alertProvider.showWithTitle('No Internet Connection', 'Please connect internet to start')
   }
   else{
     let a = {
       "phone" : this.regData.phone
     }
     this.restServiceProvider.postService(config['resendOTP'], JSON.stringify(a)).subscribe(result => {
       debugger
       if(result.Response.status == 'success'){
         localStorage.setItem("token", result.Data.api_key);
           this.toastProvider.presentToastTop("OTP resend successfully.");
         }
         else{ 
           this.toastProvider.presentToastTop(result.Error.error_msg);
         }    
         }, (err) => {
           this.toastProvider.presentToastTop(err)
           });
         }
       }
       
 

}
