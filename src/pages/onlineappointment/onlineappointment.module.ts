import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnlineappointmentPage } from './onlineappointment';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    OnlineappointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(OnlineappointmentPage),
    IonicSelectableModule
  ],
})
export class OnlineappointmentPageModule {}
