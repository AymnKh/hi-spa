import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from 'src/app/services/token.service';
import { Router, RouterModule } from '@angular/router';
import * as M from 'materialize-css';
import { User } from 'src/app/models/user.interface';
import { io } from 'socket.io-client';
import { UsersService } from 'src/app/services/users.service';

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
  constructor(private tokenService: TokenService, private router: Router, private renderer: Renderer2, private usersService: UsersService) {
    this.socket = io('http://localhost:3000'); // connect to the socket
  }

  ngOnInit() {
    this.user = this.tokenService.getPayload(); // get user payload
    this.socket.emit('online', { room: 'global', userId: this.user._id });//emit online to server to make user online
    const nav = document.querySelectorAll('.sidenav'); // initialize sidenav
    const instace = M.Sidenav.init(nav, {}); // initialize sidenav
    this.getUser(); // get user
    this.socket.on('reload', () => {
      this.getUser(); // reload the user on event
    }
    );
  }
  getUser() {
    const userId = this.user._id; // get user id
    this.usersService.getUSerById(userId).subscribe({
      next: (user) => {
        this.user = user; // set user
      },
      error: (err) => {
        console.log(err); // log error
      }
    });
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

  viewProfile(id: string) {
    this.router.navigate([`/profile/${id}`])
  }

  ngOnDestroy() { // this is to remove the overlay when the user logs out
    const sidenav = document.getElementsByClassName('sidenav-overlay');
    this.renderer.removeClass(sidenav[0], 'sidenav-overlay');
  }
}
