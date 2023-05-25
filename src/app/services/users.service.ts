import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getUSerById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  followUser(followId: string) {
    return this.http.post(`${environment.apiUrl}/friends/follow-user`, { followId });
  }
  unfollowUser(followId: string) { 
    return this.http.post(`${environment.apiUrl}/friends/unfollow-user`, { followId });
  }
  
  markNotifications(id: string, deleteIt?: boolean) {
    return this.http.post(`${environment.apiUrl}/friends/mark/${id}`, { deleteIt });
  }
}
