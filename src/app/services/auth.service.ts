import { environment } from './../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupResponse, User } from '../models/user.interface';
import { Observable } from 'rxjs';
import { UserLoginResponse } from '../components/auth/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${environment.apiUrl}/register`, user);
  }
  login(user: User): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(`${environment.apiUrl}/login`, user);
  }
}
