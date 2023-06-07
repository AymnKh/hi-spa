import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from 'src/app/services/token.service';
import { Router, RouterModule } from '@angular/router';
import * as M from 'materialize-css';
import { User } from 'src/app/models/user.interface';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user = {} as User;
  constructor(private tokenService: TokenService, private router: Router , private renderer:Renderer2 ) { }

  ngOnInit() {
    this.user = this.tokenService.getPayload(); // get user payload
    const nav = document.querySelectorAll('.sidenav'); // initialize sidenav
    const instace =  M.Sidenav.init(nav, {}); // initialize sidenav
  }
  logOut() { // this is to log out the user
    this.tokenService.deleteToken();
    this.router.navigate(['']);
  }

  ngOnDestroy() { // this is to remove the overlay when the user logs out
    const sidenav = document.getElementsByClassName('sidenav-overlay'); 
    this.renderer.removeClass(sidenav[0],'sidenav-overlay');
  }
}
