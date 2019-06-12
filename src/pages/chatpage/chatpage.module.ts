import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatpagePage } from './chatpage';

@NgModule({
  declarations: [
    ChatpagePage,
  ],
  imports: [
    IonicPageModule.forChild(ChatpagePage),
  ],
})
export class ChatpagePageModule {}
