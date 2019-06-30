import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProcessHttpmsgProvider {

  constructor(public http: Http) {
    console.log('Hello ProcessHttpmsgProvider Provider');
  }
  public extractData(res: Response){
    let body = res.json();
    return body || { };
  }

  public handleError(error: Response | any){
    let errMsg: string;
    if(error instanceof Response){
      const body = error.json();
     errMsg = body;
    }
    else{
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg)
    return Observable.throw(errMsg)
  }
}
