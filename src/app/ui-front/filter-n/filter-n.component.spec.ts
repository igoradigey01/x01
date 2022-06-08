import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterNComponent } from './filter-n.component';

describe('FilterNComponent', () => {
  let component: FilterNComponent;
  let fixture: ComponentFixture<FilterNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterNComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
