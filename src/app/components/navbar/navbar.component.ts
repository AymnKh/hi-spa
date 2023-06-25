import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from 'src/app/services/token.service';
import { Router, RouterModule } from '@angular/router';
import * as M from 'materialize-css';
import { User } from 'src/app/models/user.interface';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user = {} as User;
  socket: any;
  @Output('onlineUsers') onlineUsers = new EventEmitter<string[]>();
  constructor(private tokenService: TokenService, private router: Router, private renderer: Renderer2) {
    this.socket = io('http://localhost:3000'); // connect to the socket
  }

  ngOnInit() {
    this.user = this.tokenService.getPayload(); // get user payload
    this.socket.emit('online', { room: 'global', userId: this.user._id });//emit online to server to make user online
    const nav = document.querySelectorAll('.sidenav'); // initialize sidenav
    const instace = M.Sidenav.init(nav, {}); // initialize sidenav
  }
  ngAfterViewInit() {
    this.socket.on('onlineUsers', (data: string[]) => {
      this.onlineUsers.emit(data);
    })
  }
  logOut() { // this is to log out the user
    this.tokenService.deleteToken();
    this.socket.disconnect();
    this.router.navigate(['']);
  }

  ngOnDestroy() { // this is to remove the overlay when the user logs out
    const sidenav = document.getElementsByClassName('sidenav-overlay');
    this.renderer.removeClass(sidenav[0], 'sidenav-overlay');
  }
}
