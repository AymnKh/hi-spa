import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent {

}
