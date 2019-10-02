import { Component ,ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Nav  } from 'ionic-angular';
import { RestServiceProvider } from '../../services/rest-service/rest-service';
import {config} from '../../shared/config';
import {ToastProvider} from '../../services/toast/toast';
import { Network } from '@ionic-native/network';
import {AlertProvider } from '../../services/alert/alert';
import {SharedDataProvider} from '../../services/shared-data/shared-data';
import { ActionSheetController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import * as $ from "jquery";




@IonicPage()
@Component({
  selector: 'page-onlineappointment',
  templateUrl: 'onlineappointment.html',
})
export class OnlineappointmentPage {
  @ViewChild('myInput') myInput: ElementRef;
  //myDate = new Date(new Date().getTime()).toISOString();
  myDate = moment().format();
  myTime = moment().format('LT');
  public Comment;
  public attachmentImg:any = [];
  public loaderShow : boolean = false;
  doctorsSound: String[];
  appointSound: String[];
  addressSound: String[];
  isdoctors = false;
  isappoint = false;
  isaddress = false;
  public name = '';
  public address = '';
  public service = 'Online Appointment';
  public checkup = '';
  public equipment = '';
 
  
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public restServiceProvider: RestServiceProvider,
                public toastProvider : ToastProvider,
                public network: Network,
                public alertProvider : AlertProvider,
                public sharedDataProvider : SharedDataProvider,
                public actionSheetCtrl: ActionSheetController,public nav: Nav,
                private speechRecognition: SpeechRecognition,
                private plt: Platform, private cd: ChangeDetectorRef
              ) {
    }

    logout() {
      localStorage.clear();
      setTimeout(() => 
      this.nav.setRoot("LoginPage"),
       1000);
    }
    isIos() {
      return this.plt.is('ios');
    }
   
    stopListening() {
      this.speechRecognition.stopListening().then(() => {
        this.isdoctors = false;
        this.isappoint = false;
        this.isaddress = false;
      });
    }
   
    getPermission() {
      this.speechRecognition.hasPermission()
        .then((hasPermission: boolean) => {
          if (!hasPermission) {
            this.speechRecognition.requestPermission();
          }
        });
    }
   
    startDoctorListening() {
      let options = {
        language: 'en-US'
      }
      this.speechRecognition.startListening().subscribe(matches => {
        this.doctorsSound = matches;
        this.cd.detectChanges();
      });
      this.isdoctors = true;
    }

    startAppointListening() {
      let options = {
        language: 'en-US'
      }
      this.speechRecognition.startListening().subscribe(matches => {
        this.appointSound = matches;
        this.cd.detectChanges();
      });
      this.isappoint = true;
    }

    startAddressListening() {
      let options = {
        language: 'en-US'
      }
      this.speechRecognition.startListening().subscribe(matches => {
        this.addressSound = matches;
        this.cd.detectChanges();
      });
      this.isaddress = true;
    }

    ionViewDidLoad() {
      
      this.getPermission();
      console.log('ionViewDidLoad PlaceOrderPage');
      let getTime = $('.timeAppoint .datetime').attr('ng-reflect-model');
      $('.timeAppoint .datetime .datetime-placeholder').text(getTime);
     
    }
    resize() {
      var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
        var scrollHeight = element.scrollHeight;
        element.style.height = scrollHeight + 'px';
        this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
      }
  
      presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Modify your album',
          buttons: [
            {
              text: 'Upload from Library',
              handler: () => {
                this.openPicker()
              }
            },{
              text: 'Camera',
              handler: () => {
                this.opemcam()
              }
            },{
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        actionSheet.present();
      }
  
     
  
      submitOrder() {
    if(this.doctorsSound && this.checkup && this.appointSound && this.addressSound  && this.myDate && this.myTime){
  
      // if(!this.attachmentImg){
      //   this.toastProvider.presentToastTop("Attach one refrence image.");
  
      // }
      // else{
    let postData = {
      "userID":localStorage.getItem("userID"),
      "message":this.Comment,
      "doctor":this.doctorsSound,
      "address":this.addressSound,
      "appointment":this.appointSound,
      "service":this.service,
      "appointdate":this.myDate,
      "appointtime":this.myTime,
      "checkup":this.checkup,
      "upload_files" : this.attachmentImg ? this.attachmentImg : ""
    }
    if(this.network.type === 'none'){
      this.alertProvider.showWithTitle('No Internet Connection', 'Please connect internet to start')
    }
    else{
      this.loaderShow = true;
        this.restServiceProvider.postService(config['onlineAppoint'],postData).subscribe(result => {
          this.loaderShow = false; 
          if(result.Response.status == 'success'){
              this.toastProvider.presentToastTop("Request submitted succeefully.");
              this.Comment = '';
              this.attachmentImg = [];
            }
            else{ 
              this.toastProvider.presentToastTop(result.Error.error_msg);
            }    
            }, (err) => {
              this.loaderShow = false; 
              this.toastProvider.presentToastTop(err)
              });
            }
       //   }
          }
   }
  
  
   opemcam()
   {
       this.sharedDataProvider.openCamera().then(data =>{
       console.log("data",data);
       if(data){
           this.attachmentImg = data;
       }
       })
   }
  
  
   openPicker(){
       this.sharedDataProvider.openImagePicker().then(data =>{
           if(data){
               this.attachmentImg = data;
           }
           })
   }
  
   viewImg(i){
       this.sharedDataProvider.viewImages('data:image/png;base64,' + i);
   }
  }
  