import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Messages } from '../models/messages.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  sendMessage(senderId: string, receiverId: string, receiverName: string, message: string) {
    return this.http.post(`${environment.apiUrl}/chat-message/${senderId}/${receiverId}`, { receiverId, receiverName, message });
  }
  getAllMessages(senderId: string, receiverId: string):Observable<Messages> {
    return this.http.get<Messages>(`${environment.apiUrl}/chat-message/${senderId}/${receiverId}`);
  }
}
