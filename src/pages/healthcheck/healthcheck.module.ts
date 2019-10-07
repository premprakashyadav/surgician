import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthcheckPage } from './healthcheck';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    HealthcheckPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthcheckPage),
    IonicSelectableModule
  ],
})
export class HealthcheckPageModule {}
