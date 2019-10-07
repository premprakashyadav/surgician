import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeservicePage } from './homeservice';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    HomeservicePage,
  ],
  imports: [
    IonicPageModule.forChild(HomeservicePage),
    IonicSelectableModule
  ],
})
export class HomeservicePageModule {}
