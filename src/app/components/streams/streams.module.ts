import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamsRoutingModule } from './streams-routing.module';
import { StreamsComponent } from './streams/streams.component';
import { NavbarComponent } from '../navbar/navbar.component';


@NgModule({
  declarations: [
    StreamsComponent
  ],
  imports: [
    CommonModule,
    StreamsRoutingModule,
    NavbarComponent
  ]
})
export class StreamsModule { }
