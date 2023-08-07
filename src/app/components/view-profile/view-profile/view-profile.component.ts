import { TokenService } from './../../../services/token.service';
import { UsersService } from './../../../services/users.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as M from 'materialize-css';
import * as moment from 'moment';
import io from 'socket.io-client';
import * as _ from 'lodash';

import { Post, User } from 'src/app/models/user.interface';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
  navbarContent: any;
  currentUser = {} as User;
  user = {} as User;
  posts: Post[] = [];
  socket: any;
  userId!: string;
  modalElement: any;
  postModal = {} as Post;
  constructor(private usersService: UsersService, private route: ActivatedRoute, private postService: PostService, private router: Router, private tokenService: TokenService) {
    this.socket = io('http://localhost:3000'); // connect to the socket
  }
  ngOnInit() {
    this.styleInit();
    this.currentUser = this.tokenService.getPayload();
    this.route.params.subscribe(param => {
      this.userId = param['id']; // get userId from params
      this.getUserData(this.userId); //get user data
    })
    this.socket.on('reload', () => {
      this.getUserData(this.userId);
    })
  }
  styleInit() {
    this.navbarContent = document.querySelector('.nav-content'); // get the navbar content
    const tabs = document.querySelectorAll('.tabs')
    const tab = M.Tabs.init(tabs, {});
    this.modalElement = document.querySelector('.modal'); // get the modal
    const modal = M.Modal.init(this.modalElement, {});
  }
  ngAfterViewInit() {
    this.navbarContent.style.display = 'none'; // hide the navbar content
  }

  getUserData(id: string) { // get user data
    this.usersService.getUSerById(id).subscribe({
      next: (data) => {
        this.user = data; //getting user data
      },
      error: (err) => { },
      complete: () => {
        this.posts = this.user.posts.reverse(); //getting user posts
      }
    })
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
  openModal(post:Post) {
    this.postModal = post; // assign the modal
  }

}
