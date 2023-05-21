import { PostService } from './../../../services/post.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import io from 'socket.io-client';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  post!: FormGroup;
  socket: any;
  constructor(private postService: PostService) {
    this.socket = io('http://localhost:3000'); // connect to the socket
  }

  ngOnInit(): void {
    this.formInit();  // Initialize the form
  }
  formInit() { // Initialize the form
    this.post = new FormGroup({
      post: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  addPost() {
    const post = this.post.value.post;
    this.postService.addPost(post).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => { console.log(err); },
      complete: () => {
        this.socket.emit('reload', {}); // emit the refresh event
        this.post.reset(); // reset the form
      }

    })
  }
}
