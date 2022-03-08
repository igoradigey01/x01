import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatalogItemComponent } from './katalog-item.component';

describe('KatalogItemComponent', () => {
  let component: KatalogItemComponent;
  let fixture: ComponentFixture<KatalogItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KatalogItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KatalogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
