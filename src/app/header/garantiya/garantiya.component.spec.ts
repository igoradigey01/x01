import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GarantiyaComponent } from './garantiya.component';

describe('GarantiyaComponent', () => {
  let component: GarantiyaComponent;
  let fixture: ComponentFixture<GarantiyaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GarantiyaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarantiyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
