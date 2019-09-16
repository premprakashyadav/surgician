import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeservicePage } from './homeservice';

@NgModule({
  declarations: [
    HomeservicePage,
  ],
  imports: [
    IonicPageModule.forChild(HomeservicePage),
  ],
})
export class HomeservicePageModule {}
