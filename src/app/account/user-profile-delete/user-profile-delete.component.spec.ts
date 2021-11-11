import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserProfileDeleteComponent } from './user-profile-delete.component';

describe('UserProfileDeleteComponent', () => {
  let component: UserProfileDeleteComponent;
  let fixture: ComponentFixture<UserProfileDeleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
