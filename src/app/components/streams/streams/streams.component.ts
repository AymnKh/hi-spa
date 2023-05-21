import { TokenService } from 'src/app/services/token.service';
import { Component } from '@angular/core';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent {
  user = {} as User;
  constructor(private tokenService:TokenService) { }
  ngOnInit(): void {
    this.user = this.tokenService.getPayload();
  }
}
