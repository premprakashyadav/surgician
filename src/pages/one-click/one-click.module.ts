import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OneClickPage } from './one-click';

@NgModule({
  declarations: [
    OneClickPage,
  ],
  imports: [
    IonicPageModule.forChild(OneClickPage),
  ],
})
export class OneClickPageModule {}
