import { Component } from '@angular/core';
import * as moment from 'moment';
import { io } from 'socket.io-client';
import { User, Notifications } from 'src/app/models/user.interface';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  user = {} as User;
  notifications: Notifications[] = [];
  socket: any;
  constructor(private usersService: UsersService, private tokenService: TokenService) {
    this.socket = io('http://localhost:3000'); // connect to the socket
  }
  ngOnInit(): void {
    this.user = this.tokenService.getPayload(); // get user payload
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
        this.notifications = user.notifications.reverse(); // set notifications
      },
      error: (err) => {
        console.log(err); // log error
      }
    });
  }
  time(time: string) {
    return moment(time).fromNow(); // return time from now
  }

  markAsRead(id: string) {
    this.usersService.markNotifications(id,true).subscribe({
      next: () => {
        this.socket.emit('reload', {}); // emit refresh event
      },
      error: (err) => {
        console.log(err); // log error
      }
    });
  }
}
