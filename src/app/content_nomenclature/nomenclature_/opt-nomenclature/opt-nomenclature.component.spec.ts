import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptNomenclatureComponent } from './opt-nomenclature.component';

describe('OptNomenclatureComponent', () => {
  let component: OptNomenclatureComponent;
  let fixture: ComponentFixture<OptNomenclatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptNomenclatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptNomenclatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
