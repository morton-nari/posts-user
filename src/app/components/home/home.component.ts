import { Component} from '@angular/core';
import { Observable, delay, tap } from 'rxjs';
import { Post, User, Comment} from 'src/app/model/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loadPost: boolean = false;
  showAll = false;
  errMessage ='';
  users$ = this.userService.users$.pipe(delay(1000));
  posts$!: Observable<Post[]>;
  comments$!: Observable<Comment[]>;
  userId: number = 0;
  postId: number = 0;
  limit: number = 0;

  constructor(private userService: UserService){}

  posts(user:User){
    console.log('hey user',user);
    this.userId = user.id;
    this.loadPost =  true;
    this.showAll =  false;
    this.posts$ = this.userService.getUserPosts(this.userId, 3).pipe(
      delay(1000),
      tap(_ => this.loadPost = false),
      tap(_ => this.showAll = true),
    );
  }
  loadAllPosts(){
    this.loadPost =  false;
    this.posts$ = this.userService.getUserPosts(this.userId).pipe(
      tap(_ => this.showAll = false)
    );
  }
  loadUserPosts(userId: number, limit?: number ) {
    console.log('user id', userId);
    this.posts$ = this.userService.getUserPosts(userId, limit)
    this.userId = userId;
 }
}
