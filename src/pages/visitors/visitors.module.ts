import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitorsPage } from './visitors';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    VisitorsPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitorsPage),
    IonicSelectableModule
  ],
})
export class VisitorsPageModule {}
