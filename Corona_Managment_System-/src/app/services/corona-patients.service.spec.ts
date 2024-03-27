import { TestBed } from '@angular/core/testing';

import { CoronaPatientsService } from './corona-patients.service';

describe('CoronaPatientsService', () => {
  let service: CoronaPatientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoronaPatientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
