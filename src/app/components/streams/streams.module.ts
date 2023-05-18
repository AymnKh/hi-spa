import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamsRoutingModule } from './streams-routing.module';
import { StreamsComponent } from './streams/streams.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SideComponent } from '../side/side.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StreamsComponent,
    PostComponent,
    PostsComponent,
    
  ],
  imports: [
    CommonModule,
    StreamsRoutingModule,
    NavbarComponent,
    SideComponent,
    ReactiveFormsModule
  ]
})
export class StreamsModule { }
