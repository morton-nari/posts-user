import { Component, OnInit, Input } from '@angular/core';
import { Observable, map, take, tap } from 'rxjs';
import { Post, Comment } from 'src/app/model/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  comments$!: Observable<Comment[]>;
  @Input() post:Post | undefined;
  showComments: boolean = false;
  postId: number = 0;

  constructor(private userService: UserService) {}
  getPostId(post:Post){
    console.log('current post', post);
    this.postId = post.id;
    this.showComments = !this.showComments;
    if (!this.showComments) {
      this.comments$ = this.userService.getPostsComments(this.postId).pipe(
        take(0)
      )
    } else{
      this.comments$ = this.userService.getPostsComments(this.postId).pipe(
        take(1))
    }
  }
}
