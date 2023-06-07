import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageNotificationsRoutingModule } from './message-notifications-routing.module';
import { MessageNotificationsComponent } from './message-notifications/message-notifications.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SideComponent } from '../side/side.component';


@NgModule({
  declarations: [
    MessageNotificationsComponent
  ],
  imports: [
    CommonModule,
    MessageNotificationsRoutingModule,
    NavbarComponent,
    SideComponent
  ]
})
export class MessageNotificationsModule { }
