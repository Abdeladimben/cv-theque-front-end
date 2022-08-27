import { TestBed } from '@angular/core/testing';

import { CentreInteretService } from './centre-interet.service';

describe('CentreInteretService', () => {
  let service: CentreInteretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentreInteretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
