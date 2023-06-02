import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../model/user-model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users successfully', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' }
    ];

    service.users$.subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch user posts successfully', () => {
    const userId = 1;
    const mockPosts = [
      { id: 1, title: 'Post 1', body: 'Body of post 1' },
      { id: 2, title: 'Post 2', body: 'Body of post 2' }
    ];

    service.getUserPosts(userId).subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should fetch post comments successfully', () => {
    const postId = 1;
    const mockComments = [
      { id: 1, postId: 1, name: 'Comment 1', body: 'Body of comment 1' },
      { id: 2, postId: 1, name: 'Comment 2', body: 'Body of comment 2' }
    ];

    service.getPostsComments(postId).subscribe((comments) => {
      expect(comments).toEqual(mockComments);
    });

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });
});
