import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Comment, Post } from 'src/app/model/user-model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent  {
  @Input() comment!: Comment;
  @Output() passPostId: EventEmitter<Post> = new EventEmitter();


OnPassPostId(post:Post){
  this.passPostId.emit(post);
}
}
