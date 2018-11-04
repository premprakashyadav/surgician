import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

/**
 * Generated class for the UploadprescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-uploadprescription',
  templateUrl: 'uploadprescription.html',
})
export class UploadprescriptionPage {
  regData = { avatar:'', email: '', password: '', fullname: '' };
imgPreview = 'assets/imgs/blank-avatar.jpg';
http: HttpClient;
mailgunUrl: string;
mailgunApiKey: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private imagePicker: ImagePicker,
    private base64: Base64,http: HttpClient) {
      this.http = http;
      this.mailgunUrl = "mail.surgician.com";
      this.mailgunApiKey = window.btoa("api:key-c7046fa102dbf6f31c5af50717b1677a");
  }

    register() {
    
    this.http.post("https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages", "from=admin@surgician.com&to=" + this.regData.email + "&subject=" + this.regData.fullname + "&text=" + this.regData.avatar,
      {
        headers: { 'Authorization': 'Basic ' + this.mailgunApiKey, "Content-Type": "application/x-www-form-urlencoded" },
      }).subscribe(success => {
        console.log("SUCCESS -> " + JSON.stringify(success));
      }, error => {
        console.log("ERROR -> " + JSON.stringify(error));
      });
  }
  // send(recipient: string, subject: string, message: string) {
    
  //   this.http.post("https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages", "from=admin@test101.com&to=" + recipient + "&subject=" + subject + "&text=" + message,
  //     {
  //       headers: { 'Authorization': 'Basic ' + this.mailgunApiKey, "Content-Type": "application/x-www-form-urlencoded" },
  //     }).subscribe(success => {
  //       console.log("SUCCESS -> " + JSON.stringify(success));
  //     }, error => {
  //       console.log("ERROR -> " + JSON.stringify(error));
  //     });
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadprescriptionPage');
  }
  getPhoto() {
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          this.imgPreview = results[i];
          this.base64.encodeFile(results[i]).then((base64File: string) => {
            this.regData.avatar = base64File;
          }, (err) => {
            console.log(err);
          });
      }
    }, (err) => { });
  }

}
