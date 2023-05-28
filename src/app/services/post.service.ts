import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Post } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  addPost(post: string) {
    return this.http.post(`${environment.apiUrl}/posts/add`, { post });
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts/`);
  }

  getPost(postId: string): Observable<Post> { 
    return this.http.get<Post>(`${environment.apiUrl}/posts/${postId}`);
  }
 
  likePost(postId: string) {
    return this.http.post(`${environment.apiUrl}/posts/${postId}`, {});
  }

  addComment(postId: string, comment: string) {
    return this.http.post(`${environment.apiUrl}/posts/comment/${postId}`, { comment });
  }

}
