import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptProductComponent } from './opt-product.component';

describe('OptProductComponent', () => {
  let component: OptProductComponent;
  let fixture: ComponentFixture<OptProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
