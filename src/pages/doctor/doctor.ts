import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { RestServiceProvider } from '../../services/rest-service/rest-service';
import { config } from '../../shared/config';
import { ToastProvider } from '../../services/toast/toast';
import { Network } from '@ionic-native/network';
import { AlertProvider } from '../../services/alert/alert';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the DoctorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor',
  templateUrl: 'doctor.html',
})
export class DoctorPage {
  @ViewChild('myInput') myInput: ElementRef;
  public loaderShow: boolean = false;
  public Comment;
  public attachmentImg: any;
  public doctorsSound = '';
  public appointSound = '';
  public addressSound = '';
  public name = '';
  public address = '';
  public service = 'Doctor';
  public checkup = '';
  public equipment = '';
  public patientMobile:any;
  public myDate = '';
  public myTime = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restServiceProvider: RestServiceProvider,
    public toastProvider: ToastProvider,
    public network: Network,
    public alertProvider: AlertProvider,
    public sharedDataProvider: SharedDataProvider,
    public actionSheetCtrl: ActionSheetController, public nav: Nav
  ) {
  }
  ionViewDidLoad() {
  }

  logout() {
    localStorage.clear();
    setTimeout(() =>
      this.nav.setRoot("LoginPage"),
      1000);
  }
  resize() {
    var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

  presentActionSheet() {
    if (this.attachmentImg && this.attachmentImg.length > 8) {

      this.toastProvider.presentToastTop('More than 8 attachment are not allowed.');


    } else {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Modify your album',
        buttons: [
          {
            text: 'Upload from Library',
            handler: () => {
              this.openPicker()
            }
          }, {
            text: 'Camera',
            handler: () => {
              this.opemcam()
            }
          }, {
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


  }

  submitOrder() {
    if (this.doctorsSound && this.appointSound && this.addressSound) {

      // if(!this.attachmentImg){
      //   this.toastProvider.presentToastTop("Attach one refrence image.");

      // }
      // else{
      let postData = {
        "userID": localStorage.getItem("userID"),
        "service": this.service,
        "doctor": this.doctorsSound,
        "appointment": this.appointSound,
        "address": this.addressSound,
        "checkup": this.checkup,
        "appointdate": this.myDate,
        "appointtime": this.myTime,
        "message": this.Comment ? this.Comment : 'No Comment',
        "patientMobile": this.patientMobile,
        "upload_files": this.attachmentImg ? this.attachmentImg : ""
      };
      if (this.network.type === 'none') {
        this.alertProvider.showWithTitle('No Internet Connection', 'Please connect internet to start')
      }
      else {
        this.loaderShow = true;
        this.restServiceProvider.postService(config['onlineAppoint'], postData).subscribe(result => {
          this.loaderShow = false;
          if (result.Response.status == 'success') {
            this.toastProvider.presentToastTop("Request submitted successfully.");
            this.doctorsSound = '';
            this.appointSound = '';
            this.addressSound = '';
            this.patientMobile = '';
            this.myDate = '';
            this.Comment = '';
            this.name = '';
            this.address = '';
            this.checkup = '';
            this.equipment = '';
            this.attachmentImg = undefined;
          }
          else {
            this.toastProvider.presentToastTop(result.Error.error_msg);
          }
        }, (err) => {
          this.loaderShow = false;
          this.toastProvider.presentToastTop(err)
        });
      }
      //   }
    }  else {
      this.toastProvider.presentToastTop("Please Fill the Mandatory Fields.");
    }
  }


  opemcam() {
    this.sharedDataProvider.openCamera(this.attachmentImg).then(data => {
      console.log("data", data);
      if (data && data.length > 0) {
        this.attachmentImg = data;
      }
    })
  }


  openPicker() {
    this.sharedDataProvider.openImagePicker(this.attachmentImg).then(data => {
      if (data && data.length > 0) {
        this.attachmentImg = data;
      }
    })
  }

  viewImg(i) {
    this.sharedDataProvider.viewImages('data:image/png;base64,' + i);
  }

  deleteImg(index) {
    this.attachmentImg.splice(index, 1);
  }

  ionViewDidLeave() {
    this.attachmentImg = null;
  }
}
