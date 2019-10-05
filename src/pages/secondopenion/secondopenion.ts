import { Component ,ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { RestServiceProvider } from '../../services/rest-service/rest-service';
import {config} from '../../shared/config';
import {ToastProvider} from '../../services/toast/toast';
import { Network } from '@ionic-native/network';
import {AlertProvider } from '../../services/alert/alert';
import {SharedDataProvider} from '../../services/shared-data/shared-data';
import { ActionSheetController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-secondopenion',
  templateUrl: 'secondopenion.html',
})
export class SecondopenionPage {
  @ViewChild('myInput') myInput: ElementRef;
public Comment;
public attachmentImg:any[];
public loaderShow : boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public restServiceProvider: RestServiceProvider,
              public toastProvider : ToastProvider,
              public network: Network,
              public alertProvider : AlertProvider,
              public sharedDataProvider : SharedDataProvider,
              public actionSheetCtrl: ActionSheetController,public nav: Nav
            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceOrderPage');
  }
  resize() {
    var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      var scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
    }

    logout() {
      localStorage.clear();
      setTimeout(() => 
      this.nav.setRoot("LoginPage"),
       1000);
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
  if(this.Comment){

    // if(!this.attachmentImg){
    //   this.toastProvider.presentToastTop("Attach one refrence image.");

    // }
    // else{
  let postData = {
    "userID":localStorage.getItem("userID"),
    "description":this.Comment,
    "upload_files" : this.attachmentImg ? this.attachmentImg : ""
  }
  if(this.network.type === 'none'){
    this.alertProvider.showWithTitle('No Internet Connection', 'Please connect internet to start')
  }
  else{
    this.loaderShow = true;
      this.restServiceProvider.postService(config['placeOrder'],postData).subscribe(result => {
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
