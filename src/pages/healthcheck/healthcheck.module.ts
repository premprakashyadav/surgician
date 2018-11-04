import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthcheckPage } from './healthcheck';

@NgModule({
  declarations: [
    HealthcheckPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthcheckPage),
  ],
})
export class HealthcheckPageModule {}
