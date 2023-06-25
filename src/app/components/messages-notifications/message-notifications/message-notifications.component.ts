import { MessagesService } from './../../../services/messages.service';
import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { User, chat } from 'src/app/models/user.interface';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';

@Component({
  selector: 'app-message-notifications',
  templateUrl: './message-notifications.component.html',
  styleUrls: ['./message-notifications.component.css']
})
export class MessageNotificationsComponent {
  user = {} as User;
  chatList: chat[] = [];
  socket: any;
  constructor(private usersService: UsersService, private tokenService: TokenService, private messagesService: MessagesService) {
    this.socket = io('http://localhost:3000'); // connect to the socket
  }

  ngOnInit(): void {
    this.user = this.tokenService.getPayload(); // get user payload
    this.getUser(); // get user
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

    });
  }
  time(time: Date) {
    return moment(time).fromNow(); // return time from now
  }

  markAllAsRead(sId: string, rId: string) {
    this.messagesService.markAllMessages(sId, rId).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.socket.emit('reload', {}); // emit refresh event
      }
    })
  }
}
