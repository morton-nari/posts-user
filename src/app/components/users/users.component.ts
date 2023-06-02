import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/user-model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
@Input() user!: User;
@Output() postsLoad: EventEmitter<any> = new EventEmitter();

  constructor() { }
  ngOnInit(): void {
    
  }

  onLoadUserPosts(){
    this.postsLoad.emit(this.user);
  }
}
