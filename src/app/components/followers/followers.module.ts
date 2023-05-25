import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowersRoutingModule } from './followers-routing.module';
import { FollowersComponent } from './followers/followers.component';
import { SideComponent } from '../side/side.component';
import { NavbarComponent } from '../navbar/navbar.component';


@NgModule({
  declarations: [
    FollowersComponent
  ],
  imports: [
    CommonModule,
    FollowersRoutingModule,
    SideComponent,
    NavbarComponent
  ]
})
export class FollowersModule { }
