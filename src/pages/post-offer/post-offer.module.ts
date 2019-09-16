import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostOfferPage } from './post-offer';

@NgModule({
  declarations: [
    PostOfferPage,
  ],
  imports: [
    IonicPageModule.forChild(PostOfferPage),
  ],
})
export class PostOfferPageModule {}
