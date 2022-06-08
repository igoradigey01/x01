import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptNomenclatureItemComponent } from './opt-nomenclature-item.component';

describe('OptNomenclatureItemComponent', () => {
  let component: OptNomenclatureItemComponent;
  let fixture: ComponentFixture<OptNomenclatureItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptNomenclatureItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptNomenclatureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
