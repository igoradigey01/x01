import { TestBed } from '@angular/core/testing';

import { JsPDFService } from './js-pdf.service';

describe('JsPDFService', () => {
  let service: JsPDFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsPDFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
