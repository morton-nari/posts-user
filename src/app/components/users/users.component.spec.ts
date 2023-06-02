import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from '../home/home.component';
import { UserService } from 'src/app/services/user.service';
import { delay, of } from 'rxjs';
import { User } from 'src/app/model/user-model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserPosts', 'getPostsComments']);
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: UserService, useValue: userServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture.detectChanges();
  });

  it('should delay and return users', fakeAsync(() => {
    const mockUsers: User[] = [
      { id: 1, name: 'User 1'},
      { id: 2, name: 'User 2' }
    ];

    userService.users$ = of(mockUsers).pipe(delay(1000));

    tick(1000);

    expect(component.users$).toEqual(of(mockUsers).pipe(delay(1000)));
  }));
});
