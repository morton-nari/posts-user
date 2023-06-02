import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { UserService } from 'src/app/services/user.service';
import { Comment, Post } from 'src/app/model/user-model';
import { of } from 'rxjs';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsComponent],
      providers: [
        {
          provide: UserService,
          useValue: {
            getPostsComments: () => of([])
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the showComments flag and retrieve comments', () => {
    const mockPost: Post = { id: 1, title: 'Post 1', body:'some text', userId:1 };
    const mockComments: Comment[] = [
      { id: 1, body: 'Comment 1', postId: 1 ,email:'aa@yahoo.com' },
      { id: 2, body: 'Comment 2',postId: 2, email:'aa@yahoo.com' }
    ];

    spyOn(userService, 'getPostsComments').and.returnValue(of(mockComments));

    expect(component.showComments).toBeFalse();

    component.getPostId(mockPost);

    expect(component.showComments).toBeTrue();
    expect(component.comments$).toBeDefined();

    component.comments$.subscribe(comments => {
      expect(comments).toEqual(mockComments);
    });

    expect(userService.getPostsComments).toHaveBeenCalledWith(mockPost.id);
  });

  it('should hide comments when showComments is false', () => {
    const mockPost: Post = { id: 1, title: 'Post 1',userId:1, body:'post 1 text' };

    spyOn(userService, 'getPostsComments').and.returnValue(of([]));

    component.showComments = true;
    component.getPostId(mockPost);

    expect(component.showComments).toBeFalse();
    expect(component.comments$).toBeDefined();
    component.comments$.subscribe(comments => {
      expect(comments).toEqual([]);
    });

    expect(userService.getPostsComments).toHaveBeenCalledWith(mockPost.id);
  });
});
