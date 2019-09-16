import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {
  constructor(public http: HttpClient) {
    console.log('Hello ConfigProvider Provider');
  }
  
}
