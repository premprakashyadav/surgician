import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnyotherPage } from './anyother';

@NgModule({
  declarations: [
    AnyotherPage,
  ],
  imports: [
    IonicPageModule.forChild(AnyotherPage),
  ],
})
export class AnyotherPageModule {}
