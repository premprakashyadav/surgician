import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Nav } from 'ionic-angular';
// import { Media, MediaObject } from '@ionic-native/media/ngx';
// import { File } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { IonicSelectableComponent } from 'ionic-selectable';


import { RestServiceProvider } from '../../services/rest-service/rest-service';
import { config } from '../../shared/config';
import { ToastProvider } from '../../services/toast/toast';
import { Network } from '@ionic-native/network';
import { AlertProvider } from '../../services/alert/alert';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { ActionSheetController } from 'ionic-angular';


/**
 * Generated class for the MedicalRecordsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medical-records',
  templateUrl: 'medical-records.html',
})
export class MedicalRecordsPage {
  //   recording: boolean = false;
  // filePath: string;
  // fileName: string;
  // audio: MediaObject;
  // audioList: any[] = [];

  @ViewChild('myInput') myInput: ElementRef;
  public message = '';
  public attachmentImg: any[];
  public loaderShow: boolean = false;
  public name = '';
  public address = '';
  public service = 'Medical Records';
  public checkup = '';
  public equipment = '';

  constructor(private media: Media,
    private file: File,
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public restServiceProvider: RestServiceProvider,
    public toastProvider: ToastProvider,
    public network: Network,
    public alertProvider: AlertProvider,
    public sharedDataProvider: SharedDataProvider,
    public actionSheetCtrl: ActionSheetController, public nav: Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicalRecordsPage');
    // setTimeout(() =>{

    //   this.getAudioList();
    // },10000)
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
    if (this.message) {

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
        "checkup": this.checkup,
        "equipment": this.equipment,
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

  // getAudioList() {
  //   if(localStorage.getItem("audiolist")) {
  //     this.audioList = JSON.parse(localStorage.getItem("audiolist"));
  //     console.log(this.audioList);
  //   }
  // }

  // startRecord() {
  //   if (this.platform.is('ios')) {
  //     this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
  //     this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
  //     this.audio = this.media.create(this.filePath);
  //   } else if (this.platform.is('android')) {
  //     this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
  //     this.filePath = this.file. externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
  //     // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err =>
  //     //   console.log('Directory does not exist'));

  //     this.audio = this.media.create(this.filePath);
  //   }
  //   this.audio.startRecord();
  //   this.recording = true;
  // }

  // stopRecord() {
  //   this.audio.stopRecord();
  //   let data = { filename: this.fileName };
  //   this.audioList.push(data);
  //   localStorage.setItem("audiolist", JSON.stringify(this.audioList));
  //   this.recording = false;
  //   this.getAudioList();
  // }

  // playAudio(file,idx) {
  //   if (this.platform.is('ios')) {
  //     this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
  //     this.audio = this.media.create(this.filePath);
  //   } else if (this.platform.is('android')) {
  //     this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
  //     this.audio = this.media.create(this.filePath);
  //   }
  //   this.audio.play();
  //   this.audio.setVolume(0.8);
  // }

  logout() {
    localStorage.clear();
    setTimeout(() =>
      this.nav.setRoot("LoginPage"),
      1000);
  }
}
