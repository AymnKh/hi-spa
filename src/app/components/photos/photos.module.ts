import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos/photos.component';
import { SideComponent } from '../side/side.component';
import { NavbarComponent } from '../navbar/navbar.component';


@NgModule({
  declarations: [
    PhotosComponent
  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    SideComponent,
    NavbarComponent
  ]
})
export class PhotosModule { }
