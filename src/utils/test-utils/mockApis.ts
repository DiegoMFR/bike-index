import { signal } from "@angular/core";
import mockBike from './mock-bike.json'
import { BikeInfo } from "../../types";
import { of } from "rxjs";

const myMockBike = mockBike as BikeInfo;

export class MockBikeStore {
  fetchBikes = jasmine.createSpy('fetchBikes');
  reset = jasmine.createSpy('reset');
  location = signal('Test City');
  loading = signal(false);
  error = signal('');
  bikes = signal([myMockBike])
}

export const mockActivatedRoute = {
    params: of({}), 
    queryParams: of({}),
    snapshot: {
      paramMap: {
        get: () => null
      }
    }
  }
  