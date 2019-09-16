import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalRecordsPage } from './medical-records';

@NgModule({
  declarations: [
    MedicalRecordsPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalRecordsPage),
  ],
})
export class MedicalRecordsPageModule {}
