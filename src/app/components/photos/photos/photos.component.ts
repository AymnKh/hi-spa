import { UsersService } from 'src/app/services/users.service';
import { AlertiftyService } from './../../../services/alertifty.service';
import { Component } from '@angular/core';
import { User, photos } from 'src/app/models/user.interface';
import { TokenService } from 'src/app/services/token.service';
import { io } from 'socket.io-client';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent {
  myEvent: any;
  url!: string;
  loading: boolean = false;
  user = {} as User;
  photos: photos[] = [];
  socket: any;
  constructor(private alertiftyService: AlertiftyService, private usersService: UsersService, private tokenService: TokenService) {
    this.socket = io('http://localhost:3000'); // connect to the socket
  }

  ngOnInit() {
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
        this.photos = user.photos;
      },
      error: (err) => {
        console.log(err); // log error
      }
    });
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

  uploadPhoto() {
    this.loading = true;
    if (this.url) {
      this.usersService.uploadPhoto(this.url).subscribe({
        next: (data) => {
          console.log(data);
          this.socket.emit('reload'); // emit an event to reload the posts
        },
        error: (err) => {
          this.alertiftyService.error('photo not uploaded');
          this.loading = false;
        },
        complete: () => {
          this.alertiftyService.success('photo uploaded');
          this.url = '';
          this.loading = false;
        }
      })
    }
  }

  setProfile(photo: photos) {
    this.usersService.setProfilePhoto(photo).subscribe({
      next: (data) => {
        this.alertiftyService.success('Profile photo updated');
      },
      error: (err) => {
        console.log(err);
        this.alertiftyService.error("Can't set photo as profile now");
      },
      complete: () => {
        this.socket.emit('reload'); // emit an event to reload the posts
      }
    })
  }
  deletePhoto(photo: photos) {
    this.alertiftyService.confirm('Do you want to delete photo?', () => {
      this.usersService.deletePhoto(photo).subscribe({
        next: (data) => {
          this.photos.splice(this.photos.findIndex(p => p.photoId === photo.photoId), 1);
          this.alertiftyService.success('Photo deleted');
        },
        error: (err) => {
          this.alertiftyService.error("Can't delete photo");
        },
        complete: () => {
          this.socket.emit('reload'); // emit an event to reload the posts
        }
      })
    })
  }
}
