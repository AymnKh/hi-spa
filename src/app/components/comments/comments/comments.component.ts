import { PostService } from 'src/app/services/post.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  navbarContent: any;
  commentForm!: FormGroup;
  postId: string = '';
  constructor(private postService:PostService , private route:ActivatedRoute) { }
  ngOnInit() {
    this.navbarContent = document.querySelector('.nav-content'); // get the navbar content
    this.formInit(); // initialize the form
    this.route.params.subscribe(params => { 
      this.postId = params['id']; // get the post id from the url
     })
  }

  formInit() {
    this.commentForm = new FormGroup({
      "comment": new FormControl('', Validators.required)
    }); // initialize the form
  }

  addComment() {
    const comment = this.commentForm.value.comment; // get the comment from the form
    this.postService.addComment(this.postId, comment).subscribe({
      next: () => { },
      error: (err) => { console.log(err) },
      complete: () => { 
        this.commentForm.reset(); // reset the form
       }
      
    }); // add the comment
  }
  ngAfterViewInit() {
    this.navbarContent.style.display = 'none'; // hide the navbar content
  }
}
