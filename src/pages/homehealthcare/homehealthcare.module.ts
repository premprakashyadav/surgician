import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomehealthcarePage } from './homehealthcare';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    HomehealthcarePage,
  ],
  imports: [
    IonicPageModule.forChild(HomehealthcarePage),
    IonicSelectableModule
  ],
})
export class HomehealthcarePageModule {}
