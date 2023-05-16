import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupResponse, User } from '../models/user.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<SignupResponse>{
    return this.http.post<SignupResponse>('http://localhost:3000/api/register', user);
  }
}
