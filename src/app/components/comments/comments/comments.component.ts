import { PostService } from 'src/app/services/post.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/user.interface';
import * as moment from 'moment';
import io from 'socket.io-client';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  navbarContent: any;
  commentForm!: FormGroup;
  postId: string = '';
  post = {} as Post;
  socket: any;
  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.socket = io('http://localhost:3000'); // connect to the socket
  }
  ngOnInit() {
    this.navbarContent = document.querySelector('.nav-content'); // get the navbar content
    this.formInit(); // initialize the form
    this.route.params.subscribe(params => {
      this.postId = params['id']; // get the post id from the url
    })
    this.getPost(this.postId); // get the post

    this.socket.on('reload', () => {
      this.getPost(this.postId); // get the post
    }
    ); // listen for the reload event
  }

  formInit() {
    this.commentForm = new FormGroup({
      "comment": new FormControl('', Validators.required)
    }); // initialize the form
  }

  getPost(postId: string) {
    this.postService.getPost(postId).subscribe({
      next: (post) => {
        this.post = post; // set the post
      },
      error: (err) => { console.log(err) },
      complete: () => { }
    }); // get the post
  }

  addComment() {
    const comment = this.commentForm.value.comment; // get the comment from the form
    this.postService.addComment(this.postId, comment).subscribe({
      next: () => {

      },
      error: (err) => { console.log(err) },
      complete: () => {
        this.commentForm.reset(); // reset the form
        this.socket.emit('reload', {}); // emit the reload event
      }

    }); // add the comment
  }
  ngAfterViewInit() {
    this.navbarContent.style.display = 'none'; // hide the navbar content
  }

  time(time: string) {
    return moment(time).fromNow();
  }
}
