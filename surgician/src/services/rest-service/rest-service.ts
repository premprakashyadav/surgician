import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {ConfigProvider} from '../../services/config/config';
import {config} from '../../shared/config';
import { Storage } from '@ionic/storage';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';

import 'rxjs/Rx';
@Injectable()
export class RestServiceProvider {
 public http: any;
 public data: any;
 public baseUrl: String;  
 public baseAPI_Url: String;
 public headers: any;
 public options: any;
 public storageData: JSON;
 public profileData : any = {};
 public profileImg;
 public profileName;
  constructor(http: Http, 
              public loadingCtrl:LoadingController,
              private processHttpmsgService : ProcessHttpmsgProvider,
              public toastCtrl: ToastController,
              public configProvider : ConfigProvider,
              public storage : Storage  ) {
                this.http = http;
                this.storageData = JSON.parse('{}');
                this.baseUrl = config['baseURL'];
                this.baseAPI_Url = config['baseURL']
                this.initializeHeaders('Load');

}

initializeHeaders(url) {
  let headers = new Headers();
    headers.append('Content-Type','application/json');
    //  headers.append('Accept', 'application/json');
    this.options = new RequestOptions({ headers: headers });
}

getService(action: string) {
    this.initializeHeaders(action);
  return  this.http.get(this.baseAPI_Url + action).map(res => { 
    return this.processHttpmsgService.extractData(res) 
  }).catch(error => { 
    return this.processHttpmsgService.handleError(error) 
  });
}

postService(action: string, body: any) {
    this.initializeHeaders(action);
       return  this.http.post(this.baseAPI_Url + action, body, this.options)
        .map(res => {console.log(res);
           return this.processHttpmsgService.extractData(res) 
          })
        .catch(error => {console.log(error);
           return this.processHttpmsgService.handleError(error) 
          });
}
putService(action: string, body: any) {
  this.initializeHeaders(action);
     return  this.http.put(this.baseAPI_Url + action, body, this.options)
      .map(res => { return this.processHttpmsgService.extractData(res) })
      .catch(error => { return this.processHttpmsgService.handleError(error) });
}
}
