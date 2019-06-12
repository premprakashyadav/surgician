import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username: string = '';
  message: string = '';
  _chatSubscription: Observable<any[]>;
  messages: object[] = [];

  constructor( public navCtrl: NavController, public navParams: NavParams) {
  
    }

     ionViewDidLoad() {
     
    }
  }
