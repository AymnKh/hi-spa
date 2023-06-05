import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  navbarContent: any;
  constructor() { }

  ngOnInit() {
    this.navbarContent = document.querySelector('.nav-content'); // get the navbar content
  }

  ngAfterViewInit() {
    this.navbarContent.style.display = 'none'; // hide the navbar content
  }
}
