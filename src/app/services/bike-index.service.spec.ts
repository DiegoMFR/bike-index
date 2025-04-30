import { TestBed } from '@angular/core/testing';

import { BikeIndexService } from './bike-index.service';

describe('BikeIndexService', () => {
  let service: BikeIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BikeIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
