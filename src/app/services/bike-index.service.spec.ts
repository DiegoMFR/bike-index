import { TestBed } from '@angular/core/testing';
import { BikeIndexService } from './bike-index.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('BikeIndexService', () => {
  let service: BikeIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(BikeIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have searchBikes and getBike methods', () => {
    expect(service.searchBikes).toBeTruthy();
    expect(service.getBike).toBeTruthy();
  });
});
