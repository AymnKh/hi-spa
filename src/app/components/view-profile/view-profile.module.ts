import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProfileRoutingModule } from './view-profile-routing.module';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { NavbarComponent } from '../navbar/navbar.component';


@NgModule({
  declarations: [
    ViewProfileComponent
  ],
  imports: [
    CommonModule,
    ViewProfileRoutingModule,
    NavbarComponent
  ]
})
export class ViewProfileModule { }
