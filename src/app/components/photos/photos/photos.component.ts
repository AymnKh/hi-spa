import { UsersService } from 'src/app/services/users.service';
import { AlertiftyService } from './../../../services/alertifty.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent {
  myEvent: any;
  url!: string;
  constructor(private alertiftyService: AlertiftyService, private usersService: UsersService) { }

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
    if (this.url) {
      this.usersService.uploadPhoto(this.url).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          this.alertiftyService.error('photo not uploaded');
        },
        complete: () => {
          this.alertiftyService.success('photo uploaded');
          this.url = '';
        }
      })
    }
  }
}
