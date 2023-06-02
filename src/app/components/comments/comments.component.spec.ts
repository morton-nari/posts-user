import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsComponent } from './comments.component';
import { Post } from 'src/app/model/user-model';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit the post ID when OnPassPostId is called', () => {
    const post: Post = { id: 1,userId:1, title: 'Test Content', body: 'Test Content' };
    let emittedPost: Post | undefined;

    component.passPostId.subscribe((value: Post) => {
      emittedPost = value;
    });

    component.OnPassPostId(post);

    expect(emittedPost).toEqual(post);
  });
});
