import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    const nav = document.querySelectorAll('.sidenav');
    const instace =  M.Sidenav.init(nav, {});
  }
  logOut() {
    this.tokenService.deleteToken();
    this.router.navigate(['']);
  }
}
