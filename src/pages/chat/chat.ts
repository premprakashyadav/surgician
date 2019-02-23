import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
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

  constructor(public db: AngularFirestore,
    public navCtrl: NavController, public navParams: NavParams,private fire: AngularFireAuth) {
      this.username = fire.auth.currentUser.email;
      this._chatSubscription = db.collection('_chatSubscription').valueChanges();
      // this._chatSubscription = this.db.list('/chat').subscribe( data => {
      //   this.messages = data;
      // });
    }

     ionViewDidLoad() {
      this.db.collection('/chat').add({
        specialMessage: true,
        message: `${this.username} has joined the room`
      });
    }

    // sendMessage() {
    //   this.db.list('/chat').push({
    //     username: this.username,
    //     message: this.message
    //   }).then( () => {
    //     // message is sent
    //   });
    //   this.message = '';
    // }

    // ionViewDidLoad() {
    //   this.db.list('/chat').push({
    //     specialMessage: true,
    //     message: `${this.username} has joined the room`
    //   });
    // }

    // ionViewWillLeave(){
    //   this._chatSubscription.unsubscribe();
    //   this.db.list('/chat').push({
    //     specialMessage: true,
    //     message: `${this.username} has left the room`
    //   });
    // }
  }
