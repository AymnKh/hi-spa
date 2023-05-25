import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { User, Following, Followers } from 'src/app/models/user.interface';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent {
  user = {} as User;
  followers: Followers[] = [];
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
        console.log(this.user);
        this.followers = user.followers; // set followers
        this.following = user.following; // set following
      },
      error: (err) => {
        console.log(err); // log error
      }
    });
  }
  isUserFollowing(userId: string) {
    const result = _.find(this.following, ['followedUser._id', userId]);
    if (result) {
      return true;
    } else {
      return false;
    }
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
  followUser(followId: string) {
    this.usersService.followUser(followId).subscribe({
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
