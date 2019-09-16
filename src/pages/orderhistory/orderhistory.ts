import { Component ,ViewChild, ElementRef} from '@angular/core';
import { Events, Content, TextInput, Nav } from 'ionic-angular';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { RestServiceProvider } from '../../services/rest-service/rest-service';
import {config} from '../../shared/config';
import {ToastProvider} from '../../services/toast/toast';
import { Network } from '@ionic-native/network';
import {AlertProvider } from '../../services/alert/alert';
import {SharedDataProvider} from '../../services/shared-data/shared-data';
import { ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-orderhistory',
  templateUrl: 'orderhistory.html',
})
export class OrderhistoryPage {
  public orderHistoryList : any = [];
  public tempOrder : any = [];
  public loaderShow : boolean = false;
  
    constructor(   public navParams: NavParams,
                   public events: Events,
                   public sharedDataProvider : SharedDataProvider,
                   public restServiceProvider: RestServiceProvider,
                   public loadingCtrl: LoadingController, 
                   public toastCtrl: ToastController,
                   public toastProvider : ToastProvider,
                   public network: Network,
                   public nav: Nav,
                   public alertProvider : AlertProvider) {
                   this.getChatHistory()
    }

    logout() {
      localStorage.clear();
      setTimeout(() => 
      this.nav.setRoot("LoginPage"),
       1000);
    }
  
    getChatHistory() {
      if(this.network.type === 'none'){
        this.alertProvider.showWithTitle('No Internet Connection', 'Please connect internet to start')
      }
      else{
        this.loaderShow = true;
          let myId= localStorage.getItem('userID');
         this.restServiceProvider.getService(config['allorder']).subscribe(result => {
          this.loaderShow = false;
  
                    if(result.Response.status == 'success'){
                     console.log(result.Data)
                     this.orderHistoryList = result.Data;
                     this.tempOrder  = result.Data;
                    } 
                    else{ 
                    }    
            }, (err) => {
              this.loaderShow = false;
              this.toastProvider.presentToastTop(err)
              });
            }
       }
  
       filterItems(searchTerm){
         this.orderHistoryList = [];
         this.tempOrder.filter((item) => {
           if(item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
            this.orderHistoryList.push(item);
           }
        });    
    }
   
  
  }
  