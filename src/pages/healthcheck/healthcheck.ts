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
  selector: 'page-healthcheck',
  templateUrl: 'healthcheck.html',
})
export class HealthcheckPage {
  @ViewChild('myInput') myInput: ElementRef;
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;
  public message = '';
  public attachmentImg: any[];
  public loaderShow: boolean = false;
  public name = '';
  public address = '';
  public service = 'Health Checkup';
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
    this.ports = [{ name: "Preventive Health Checkup" },
    { name: "Senior Citizen Health Checkup" },
    { name: "Women's Health Checkup" },
    { name: "Family Health Checkup" },
    { name: "Corporate Health Checkup" },
    { name: "Complete Child Checkup" },
    { name: "School Health Checkup" },
    { name: "Cardiac Health Checkup" },
    { name: "Arthritis Health Checkup" },
    { name: "Diabetes Health Checkup" },
    { name: "Infertility Health Checkup" },
    { name: "Pre-operative Health Checkup" },
    { name: "Cancer Screening Health Checkup" },
    { name: "Residential Health Checkup" },
    { name: "Vitamin Test" },
    { name: "Liver Test" },
    { name: "Anemia Test" },
    { name: "Kidney Test" },
    { name: "Thyroid Test" },
    { name: "PCOD Test" },
    { name: "Other Test" }];

  }
  ionViewDidLoad() {
  }


  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.checkup = event.value;
    console.log('port:', event.value);
  };
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

  submitOrder() {
    if (this.checkup && this.address) {

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
        "equipment": this.equipment,
        "upload_files": this.attachmentImg ? this.attachmentImg : ""
      };
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
    this.sharedDataProvider.openCamera().then(data => {
      console.log("data", data);
      if (data && data.length > 0) {
        this.attachmentImg = data;
      }
    })
  }


  openPicker() {
    this.sharedDataProvider.openImagePicker().then(data => {
      if (data && data.length > 0) {
        this.attachmentImg = data;
      }
    })
  }

  viewImg(i) {
    this.sharedDataProvider.viewImages('data:image/png;base64,' + i);
  }
}
