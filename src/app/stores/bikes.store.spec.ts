import { TestBed } from '@angular/core/testing';
import { BikeStore } from './bikes.store';
import mockBike from '../../utils/test-utils/mock-bike.json';
import { of, throwError } from 'rxjs';
import { BikeIndexService } from '../services/bike-index.service';
import { BikeInfo } from '../../types';

describe('BikeStore', () => {
  let store: BikeStore;
  let serviceSpy: jasmine.SpyObj<BikeIndexService>;
  const myMockBike = mockBike as BikeInfo;

  beforeEach(() => {
    spyOn(console, 'error');
    serviceSpy = jasmine.createSpyObj('BikeIndexService', ['searchBikes', 'getBike']);

    serviceSpy.searchBikes.and.returnValue(of({ bikes: [myMockBike] }));
    serviceSpy.getBike.and.returnValue(of({ bike: myMockBike }));

    TestBed.configureTestingModule({
      providers: [
        BikeStore,
        { provide: BikeIndexService, useValue: serviceSpy },
      ]
    });

    store = TestBed.inject(BikeStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should load bikes and set location', () => {
    store.fetchBikes('almere');
    expect(serviceSpy.searchBikes).toHaveBeenCalled();
    expect(store.bikes()).toEqual([myMockBike]);
    expect(store.location()).toBe('almere');
    expect(store.loading()).toBeFalse();
    expect(store.error()).toBe('');
  });

  it('should handle errors from fetchBikes()', () => {
    serviceSpy.searchBikes.and.returnValue(throwError(() => new Error('fail')));
    store.fetchBikes('almere');

    expect(store.error()).toBe('Error retrieving bikes.');
    expect(store.loading()).toBeFalse();
  });

  it('should not fetch more bikes if end page reached', () => {
    store.fetchBikes('amsterdam');
    store['endPageReached'].set(true);
    serviceSpy.searchBikes.calls.reset();

    store.fetchMoreBikes();
    expect(serviceSpy.searchBikes).not.toHaveBeenCalled();
  });

  it('should not fetch more bikes if no location is set', () => {
    store['location'].set('');
    store.fetchMoreBikes();
    expect(serviceSpy.searchBikes).not.toHaveBeenCalled();
  });

  it('should fetch a single bike and add it if not present', () => {
    store.fetchSingleBike('2794809');
    expect(serviceSpy.getBike).toHaveBeenCalledWith('2794809');
    expect(store.bikes()).toContain(myMockBike);
  });

  it('should not add duplicate bikes', () => {
    store.fetchBikes('rotterdam');
    serviceSpy.getBike.and.returnValue(of({ bike: myMockBike }));
    store.fetchSingleBike(myMockBike.id.toString());
    expect(store.bikes().length).toBe(1);
  });

  it('should handle errors from getBike()', () => {
    serviceSpy.getBike.and.returnValue(throwError(() => new Error('fail')));
    store.fetchSingleBike('123');
    expect(store.error()).toBe('Bike not found.');
  });

  it('should reset the store state', () => {
    store.fetchBikes('den haag');
    store.reset();
    expect(store.bikes()).toEqual([]);
    expect(store.error()).toBe('');
    expect(store.loading()).toBeFalse();
    expect(store.location()).toBe('');
    expect(store.endPageReached()).toBeFalse();
  });
});