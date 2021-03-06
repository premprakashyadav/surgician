import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { RestServiceProvider } from '../../services/rest-service/rest-service';
import { config } from '../../shared/config';
import { ToastProvider } from '../../services/toast/toast';
import { Network } from '@ionic-native/network';
import { AlertProvider } from '../../services/alert/alert';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { ActionSheetController } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Port } from '../../types';

@IonicPage()
@Component({
  selector: 'page-homehealthcare',
  templateUrl: 'homehealthcare.html',
})
export class HomehealthcarePage {
  @ViewChild('myInput') myInput: ElementRef;
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;
  public message = '';
  public attachmentImg: any[];
  public loaderShow: boolean = false;
  public name = '';
  public address = '';
  public service = 'Home Health Care';
  public checkup = '';
  public equipment = '';
  ports: Port[];
  port: Port;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restServiceProvider: RestServiceProvider,
    public toastProvider: ToastProvider,
    public network: Network,
    public alertProvider: AlertProvider,
    public sharedDataProvider: SharedDataProvider,
    public actionSheetCtrl: ActionSheetController, public nav: Nav
  ) {

    this.ports = [
      { name: "Nurse" },
      { name: "Female Attendant" },
      { name: "Male Attendant" },
      { name: "Physiotherapy at Home" },
      { name: "Child Care" },
      { name: "Doctors Visit at Home" },
      { name: "X Ray at Home" },
      { name: "Home ICU Setup" },
      { name: "Special Child Care at Home" },
      { name: "E.C.G. at home" },
      { name: "Oxygen Service at home" },
      { name: "Ambulatory Blood Pressure Services at home" },
      { name: "Ambulance Services" },
      { name: "NRI Home Care" },
      { name: "Elderly Care Services" },
      { name: "Home NICU/PICU Setup" },
      { name: "Wardboy Services" },
      { name: "Home Chemotherapy" },
      { name: "Bed Ridden Care" },
      { name: "Post Hospitalisation Care" },
      { name: "Post Surgery Care" },
      { name: "Cancer/Stroke/Cardiac Care" },
      { name: "Yoga at home" },
      { name: "Fitness Trainer at home" },
      { name: "Other Services" }];
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
    if (this.attachmentImg && this.attachmentImg.length >= 8) {

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
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.checkup = event.value;
    console.log('port:', event.value);
  };

  submitOrder() {
    if (this.checkup && this.equipment && this.address) {

      // if(!this.attachmentImg){
      //   this.toastProvider.presentToastTop("Attach one refrence image.");

      // }
      // else{
      let postData = {
        "userID": localStorage.getItem("userID"),
        "name": this.name,
        "message": this.message ? this.message : 'No Comment',
        "address": this.address,
        "service": this.service,
        "checkup": JSON.stringify(this.checkup),
        "equipment": JSON.stringify(this.equipment),
        "upload_files": this.attachmentImg ? this.attachmentImg : ""
      }
      if (this.network.type === 'none') {
        this.alertProvider.showWithTitle('No Internet Connection', 'Please connect internet to start')
      }
      else {
        this.loaderShow = true;
        this.restServiceProvider.postService(config['commmonForm'], postData).subscribe(result => {
          this.loaderShow = false;
          if (result.Response.status == 'success') {
            this.toastProvider.presentToastTop("Request submitted successfully.");
            this.message = '';
            this.name = '';
            this.address = '';
            this.checkup = '';
            this.equipment = '';
            this.portComponent.clear();
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
    } else {
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
