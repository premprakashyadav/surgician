import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  ToastController } from 'ionic-angular';
@Injectable()
export class ToastProvider {
  constructor(public http: HttpClient,
              public toastCtrl: ToastController,) {
  }
  public presentToastTop(msg) {
    let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'top'
    })
    toast.present();
}
public presentToastBottom(msg) {
  let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
  })
  toast.present();
}
}
