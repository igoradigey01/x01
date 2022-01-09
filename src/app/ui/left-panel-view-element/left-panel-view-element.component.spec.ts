import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPanelViewElementComponent } from './left-panel-view-element.component';

describe('LeftPanelViewElementComponent', () => {
  let component: LeftPanelViewElementComponent;
  let fixture: ComponentFixture<LeftPanelViewElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftPanelViewElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPanelViewElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
