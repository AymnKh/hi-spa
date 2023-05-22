import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsComponent } from './comments/comments.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SideComponent } from '../side/side.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CommentsComponent
  ],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    NavbarComponent,
    SideComponent,
    ReactiveFormsModule
  ]
})
export class CommentsModule { }
