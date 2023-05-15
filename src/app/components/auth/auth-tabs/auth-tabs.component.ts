import { Component } from '@angular/core';
import * as M from 'materialize-css';
@Component({
  selector: 'app-auth-tabs',
  templateUrl: './auth-tabs.component.html',
  styleUrls: ['./auth-tabs.component.css']
})
export class AuthTabsComponent {

  constructor() { }

  ngOnInit() {
    var tabs = document.querySelectorAll('.tabs');
    var instances = M.Tabs.init(tabs, {
      swipeable: true,
      duration:300
    });
  }

}
