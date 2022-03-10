import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NomenclatureComponent } from './nomenclature.component';

describe('NomenclatureComponent', () => {
  let component: NomenclatureComponent;
  let fixture: ComponentFixture<NomenclatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NomenclatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomenclatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
