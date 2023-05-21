import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  setToken(token: string) {
    this.cookieService.set('token', token); // save token in cookie
  }

  getToken() {
    return this.cookieService.get('token'); // get token from cookie
  }

  deleteToken() {
    this.cookieService.delete('token'); // delete token from cookie
  }

  getPayload() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1]; // split token into 3 parts
      payload = JSON.parse(window.atob(payload)); // decode payload
    }
    return payload.user; // return payload
  }
}
