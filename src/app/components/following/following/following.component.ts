import { Component } from '@angular/core';
import * as _ from 'lodash';
import { io } from 'socket.io-client';
import { User, Following } from 'src/app/models/user.interface';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent {
  user = {} as User;
  following: Following[] = [];
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
        this.following = user.following; // set following
      },
      error: (err) => {
        console.log(err); // log error
      }
    });
  }
  unfollow(userId: string) {
    this.usersService.unfollowUser(userId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.socket.emit('reload'); // emit an event to reload the posts
      }
    });
  }

}
