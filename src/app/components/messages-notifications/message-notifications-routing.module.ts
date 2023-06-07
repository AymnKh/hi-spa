import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageNotificationsComponent } from './message-notifications/message-notifications.component';

const routes: Routes = [
  {
    path: '',
    component:MessageNotificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageNotificationsRoutingModule { }
