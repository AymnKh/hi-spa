import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat/chat.component';
import { MessagesComponent } from './messages/messages.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { NgxAutoScrollModule } from "ngx-auto-scroll";
import { PickerModule } from "@ctrl/ngx-emoji-mart";

@NgModule({
  declarations: [
    ChatComponent,
    MessagesComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    NavbarComponent,
    FormsModule,
    NgxAutoScrollModule,
    PickerModule
  ]
})
export class ChatModule { }
