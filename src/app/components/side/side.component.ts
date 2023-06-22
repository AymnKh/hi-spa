import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import { User, chat } from 'src/app/models/user.interface';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-side',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent {

  user = {} as User;
  chatList: chat[] = [];
  count = 0
  socket: any;
  constructor(private usersService: UsersService, private tokenService: TokenService) { 
    this.socket = io('http://localhost:3000'); // connect to the socket
  }
  ngOnInit() { 
    this.user = this.tokenService.getPayload(); // get user payload
    this.getUser();
    this.socket.on('reload', () => {
      this.getUser(); // get user on reload
    }
    )
  }
  getUser() {
    const userId = this.user._id; // get user id
    this.usersService.getUSerById(userId).subscribe({
      next: (user) => {
        this.user = user; // set user
        this.chatList = user.chatList; // get chat list
      },
      error: (err) => {
        console.log(err); // log error
      },
      complete: () => {
        this.chatList.forEach((chat) => {
          const read = chat.messageId.messages[chat.messageId.messages.length - 1].isRead
          if (!read) {
            this.count += 1;
          }
        })
      }
    });
  }
}
