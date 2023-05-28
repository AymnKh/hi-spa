import { TokenService } from 'src/app/services/token.service';
import { Component } from '@angular/core';
import { Following, Post, User } from 'src/app/models/user.interface';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment';
import io from 'socket.io-client';

import * as _ from 'lodash';
import {  Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: Post[] = [];
  socket: any;
  user = {} as User;
  constructor(
    private postService: PostService,
    private TokenService: TokenService,
    private router: Router,
    private usersService: UsersService,
  ) {
    this.socket = io('http://localhost:3000'); // connect to the socket
  }

  ngOnInit() {
    this.getUser(); // get the user on component initialization
    this.getAllPosts(); // get all posts on component initialization
    this.socket.on('reload', () => {
      this.getAllPosts(); // reload the posts on event
    })
  }
  getUser() {
    this.user = this.TokenService.getPayload(); // get the user from the token
    const userId = this.user._id; // get user id
    this.usersService.getUSerById(userId).subscribe({
      next: (user) => {
        this.user = user; // set user
      },
      error: (err) => {
        console.log(err); // log error
      },
      complete: () => {
       
      }
    });

  }
  getAllPosts() {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        console.log(posts);
        this.posts = posts; // set the post
      },
      error: (err) => {
        console.log(err); // log any errors
      },
      complete: () => {
        
      }

    });
  }
  likePost(post: Post) {
    const postId = post._id; // get the post id
    this.postService.likePost(postId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err); // log any errors
      },
      complete: () => {
        this.socket.emit('reload'); // emit an event to reload the posts
      }
    })
  }
  isUserLikedPost(arr: any[], username: string) {
    return _.some(arr, { username: username }); // check if the user is in the array
  }
  time(time: string) {
    return moment(time).fromNow();
  }
  commentBox(postId: string) {
    this.router.navigate(['post', postId]); // navigate to the post page
  }


}
