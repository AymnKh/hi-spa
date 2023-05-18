import { TokenService } from 'src/app/services/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService:TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = { // set headers
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization':''
    }
    const token = this.tokenService.getToken(); // get token
    if(token){
      headers['Authorization'] = `Bearer ${token}`; // set token
    }
    const newRequest = request.clone({ // clone request and set new headers
      setHeaders: headers
    });
    return next.handle(newRequest); // send request
  }
}
