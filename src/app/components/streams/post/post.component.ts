import { PostService } from './../../../services/post.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  post!: FormGroup;

  constructor(private postService: PostService) { }

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
      complete: () => { this.post.reset(); }

    })
  }
}
