import { User } from 'src/app/models/user.interface';
import { UsersService } from './../../../services/users.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pepole',
  templateUrl: './pepole.component.html',
  styleUrls: ['./pepole.component.css']
})
export class PepoleComponent {
  allUsers:User[] = [];
  constructor(private usersService: UsersService) { }
  ngOnInit(): void { 
    this.usersService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users;
      },
      error: (err) => {
        console.log(err);
      }

    });
   }
}
