import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { UserService } from 'src/app/services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, Post, Comment } from 'src/app/model/user-model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    userService = fixture.debugElement.injector.get(UserService);
  });
  it('should load users with delay', fakeAsync(() => {
    const users: User[] = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Bob Johnson' }
    ];

    spyOn(userService.users$, 'pipe').and.returnValue(of(users).pipe(delay(1000)));

    fixture.detectChanges();
    tick(1000);

    expect(component.users$).toBeDefined();
    component.users$.subscribe((data) => {
      expect(data).toEqual(users);
    });
  }));

  it('should load posts for a user', fakeAsync(() => {
    const user: User = { id: 1, name: 'John Doe' };
    const posts: Post[] = [
      { id: 1, title: 'Post 1', userId: 1, body:' body 1 text' },
      { id: 2, title: 'Post 2', userId: 2, body:' body 1 text' },
      { id: 3, title: 'Post 3', userId: 3, body:' body 1 text' }
    ];

    spyOn(userService, 'getUserPosts').and.returnValue(of(posts).pipe(delay(1000)));

    component.posts(user);
    expect(component.loadPost).toBe(true);
    expect(component.showAll).toBe(false);

    tick(1000);
    fixture.detectChanges();

    expect(component.loadPost).toBe(false);
    expect(component.showAll).toBe(true);
    expect(component.posts$).toBeDefined();
    component.posts$.subscribe((data) => {
      expect(data).toEqual(posts);
    });
  }));

  it('should load all posts for a user', fakeAsync(() => {
    const posts: Post[] = [
      { id: 1, title: 'Post 1', userId: 1, body:' body 1 text' },
      { id: 2, title: 'Post 2', userId: 2, body:' body 1 text' },
      { id: 3, title: 'Post 3', userId: 3, body:' body 1 text' }
    ];

    spyOn(userService, 'getUserPosts').and.returnValue(of(posts));

    component.loadAllPosts();
    expect(component.loadPost).toBe(false);
    expect(component.showAll).toBe(false);
    expect(component.posts$).toBeDefined();
    component.posts$.subscribe((data) => {
      expect(data).toEqual(posts);
    });
  }));

  it('should load user posts with specified limit', () => {
    const userId = 1;
    const limit = 3;

    spyOn(userService, 'getUserPosts').and.stub();

    component.loadUserPosts(userId, limit);
    expect(component.userId).toBe(userId);
    expect(component.posts$).toBeDefined();
    expect(userService.getUserPosts).toHaveBeenCalledWith(userId, limit);
  });
});
