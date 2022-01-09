import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgRenderComponent } from './img-render.component';

describe('ImgRenderComponent', () => {
  let component: ImgRenderComponent;
  let fixture: ComponentFixture<ImgRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
