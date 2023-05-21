import { Component } from '@angular/core';
import { Post } from 'src/app/models/user.interface';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment';
import io from 'socket.io-client';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: Post[] = [];
  socket: any;
  constructor(private postService: PostService) { 
    this.socket = io('http://localhost:3000'); // connect to the socket
  }

  ngOnInit() {
    this.getAllPosts(); // get all posts on component initialization
    this.socket.on('reload', () => {
      this.getAllPosts(); // reload the posts on event
    })
  }
  getAllPosts() {
    this.postService.getAllPosts().subscribe({  
      next: (posts) => {
        this.posts = posts; // assign the posts to the posts property
      },
      error: (err) => {
        console.log(err); // log any errors
      },
      complete: () => {

      }

    });
  }

  time(time:string) {
    return moment(time).fromNow();
  }

}
