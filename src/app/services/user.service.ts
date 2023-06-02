import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  userUrl = "https://jsonplaceholder.typicode.com/users";
  users$ = this.http.get<User[]>(this.userUrl)

  
  getUserPosts(userId: number, limit?: number): Observable<any[]> {
    let postUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    if (limit) {
      postUrl += `&_limit=${limit}`;
    }
    return this.http.get<any[]>(postUrl);
  }
  
  getPostsComments(postId: number): Observable<any[]> {
    let url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
    return this.http.get<any[]>(url);
  }
 
}
