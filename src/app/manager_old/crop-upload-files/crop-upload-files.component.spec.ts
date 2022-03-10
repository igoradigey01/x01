import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CropUploadFilesComponent } from './crop-upload-files.component';

describe('CropUploadFilesComponent', () => {
  let component: CropUploadFilesComponent;
  let fixture: ComponentFixture<CropUploadFilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CropUploadFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropUploadFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
