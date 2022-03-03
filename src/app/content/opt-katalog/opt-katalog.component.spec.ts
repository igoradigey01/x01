import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptKatalogComponent } from './opt-katalog.component';

describe('OptKatalogComponent', () => {
  let component: OptKatalogComponent;
  let fixture: ComponentFixture<OptKatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptKatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptKatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
