import { TokenService } from './../../../services/token.service';
import { Following, User } from 'src/app/models/user.interface';
import { UsersService } from './../../../services/users.service';
import { Component } from '@angular/core';
import * as _ from 'lodash';
import io from 'socket.io-client';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pepole',
  templateUrl: './pepole.component.html',
  styleUrls: ['./pepole.component.css']
})
export class PepoleComponent {
  allUsers: User[] = [];
  user = {} as User;
  following: Following[] = [];
  socket: any;
  onlineUsers: string[] = [];
  constructor(private usersService: UsersService, private tokenService: TokenService, private router: Router) {
    this.socket = io('http://localhost:3000'); // connect to the socket
  }
  ngOnInit(): void {
    this.getAllUsers(); // get all users 
    this.user = this.tokenService.getPayload(); // get user payload
    this.getUser(); // get user
    this.socket.on('reload', () => {
      this.getUser(); // reload the user on event
    }
    );
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users; // set all users
      },
      error: (err) => {
        console.log(err); // log error
      },
      complete: () => {
        this.allUsers = _.filter(this.allUsers, (user) => { // filter out the current user
          return user.username !== this.user.username;
        });
      }

    });
  }

  getUser() {
    const userId = this.user._id; // get user id
    this.usersService.getUSerById(userId).subscribe({
      next: (user) => {
        this.user = user; // set user
        console.log(this.user);
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

  online(event: any) {
    this.onlineUsers = event;
  }

  checkOnlineStatus(id: string) {
    const result = _.indexOf(this.onlineUsers, id);
    if (result > -1) {
      return true;
    } else {
      return false;
    }

  }


  viewProfile(id: string) {
    this.router.navigate(['profile', id])
  }
}
