import { MessagesService } from './../../../services/messages.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  receiverId: string = '';
  receiverName: string = '';
  receiverUser = {} as User;
  senderUser = {} as User;
  message!: string;
  constructor(private route: ActivatedRoute, private usersService: UsersService, private tokenService: TokenService, private messagesService: MessagesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.receiverId = params['id']; // get the receiver id from the url
      this.getUser(); // get the receiver
    })
    this.senderUser = this.tokenService.getPayload(); // get the sender
  }

  getUser() {
    this.usersService.getUSerById(this.receiverId).subscribe({
      next: (user) => {
        this.receiverUser = user; // set the receiver data
        this.receiverName = user.username; // set the receiver name

      },
      error: (err) => { console.log(err) },
      complete: () => { }

    }) // get the receiver

  }
  sendMessage() { 
    this.messagesService.sendMessage(this.senderUser._id, this.receiverUser._id, this.receiverUser.username, this.message).subscribe({
      next: (data) => {
        this.message = '';
        console.log(data);
      },
      error: (err) => { console.log(err) },
      complete: () => { }

    })
  }

}
