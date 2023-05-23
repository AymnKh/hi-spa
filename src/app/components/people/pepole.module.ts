import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PepoleRoutingModule } from './pepole-routing.module';
import { PepoleComponent } from './pepole/pepole.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SideComponent } from '../side/side.component';


@NgModule({
  declarations: [
    PepoleComponent
  ],
  imports: [
    CommonModule,
    PepoleRoutingModule,
    NavbarComponent,
    SideComponent
  ]
})
export class PepoleModule { }
