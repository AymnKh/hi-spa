import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { SideComponent } from '../side/side.component';
import { NavbarComponent } from '../navbar/navbar.component';


@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    SideComponent,
    NavbarComponent
  ]
})
export class NotificationsModule { }
