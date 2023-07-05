import { Component } from '@angular/core';
import * as M from 'materialize-css';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
  navbarContent: any;
  
  ngOnInit() {
    this.navbarContent = document.querySelector('.nav-content'); // get the navbar content
    const tabs = document.querySelectorAll('.tabs')
    const instance = M.Tabs.init(tabs, {});
  }
  ngAfterViewInit() {
    this.navbarContent.style.display = 'none'; // hide the navbar content
  }

}
