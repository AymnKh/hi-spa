import { PostService } from './../../../services/post.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import io from 'socket.io-client';
import { AlertiftyService } from 'src/app/services/alertifty.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  post!: FormGroup;
  socket: any;
  myEvent: any;
  url!: string;
  loading: boolean = false;
  constructor(private postService: PostService, private alertiftyService: AlertiftyService) {
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
    let body;
    if (!this.url) {
      body = { post: this.post.value.post }
    } else {
      body = {
        post: this.post.value.post,
        photo: this.url
      }
    }
    this.loading = true;
    this.postService.addPost(body).subscribe({
      next: (data) => {
        console.log(data);
        this.alertiftyService.success('Post added');
        this.loading = false;
      },
      error: (err) => { console.log(err); this.loading = false; },
      complete: () => {
        this.socket.emit('reload', {}); // emit the refresh event
        this.post.reset(); // reset the form
        this.url = ""; //rest url
        this.loading = false;
      }

    })
  }
  onSelectFile(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = () => {
        if (!event.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
          this.alertiftyService.warning('image should be JPG|JPEG|PNG|GIF');
          this.url = '';
          this.clearPath();
        }
        else {
          if (event.target.files[0].size > 1.5 * 1024 * 1024) {
            this.alertiftyService.warning('image should not be more than 1.5mb');
            this.url = '';
            this.clearPath();
          } else {
            this.url = reader.result as string;
            this.myEvent = event;
            this.clearPath();
          }
        }
      }
    }
  }
  clearPath() {
    const filePath = <HTMLInputElement>document.getElementById('upload'); //get element by id 
    filePath.value = '';
  }

}
