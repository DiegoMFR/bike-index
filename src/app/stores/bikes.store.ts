import { Injectable, inject, signal } from '@angular/core';
import { catchError, finalize, tap } from 'rxjs/operators';
import { BikeIndexSearchParams, BikeIndexService } from '../services/bike-index.service';
import { BikeInfo } from '../../types';
import { handleError } from './storeUtils';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BikeStore {
  private readonly bikeService = inject(BikeIndexService);

  readonly bikes = signal<BikeInfo[]>([]);
  readonly error = signal('');
  readonly loading = signal(false);
  readonly endPageReached = signal(false);

  private nextPage = 1;
  private location = '';
  private readonly pageSize = 10;

  private readonly baseParams: BikeIndexSearchParams = {
    stolenness: 'proximity',
    distance: '1',
    per_page: this.pageSize,
  };

  private updateBikes(newBikes: BikeInfo[], append = false) {
    const updated = append ? [...this.bikes(), ...newBikes] : newBikes;
    this.bikes.set(updated);
    if (newBikes.length < this.pageSize) this.endPageReached.set(true);
  }

  //TODO move to utils
  private withLoading<T>(obs$: Observable<T>) {
    this.loading.set(true);
    return obs$.pipe(finalize(() => this.loading.set(false)));
  }

  fetchBikes(location: string): void {
    this.reset();
    this.location = location;

    this.withLoading(
      this.bikeService.searchBikes({ params: { ...this.baseParams, location } }).pipe(
        tap(res => this.updateBikes(res.bikes)),
        catchError(handleError(this.error, 'Error retrieving bikes.'))
      )
    ).subscribe();
  }

  fetchMoreBikes(): void {
    if (this.endPageReached() || !this.location) return;

    this.nextPage++;
    this.withLoading(
      this.bikeService.searchBikes({
        params: { ...this.baseParams, location: this.location, page: this.nextPage }
      }).pipe(
        tap(res => this.updateBikes(res.bikes, true)),
        catchError(handleError(this.error, 'Error retrieving more bikes.'))
      )
    ).subscribe();
  }

  fetchSingleBike(id: string): void {
    this.withLoading(
      this.bikeService.getBike(id).pipe(
        tap(res => res.bike && this.addBike(res.bike)),
        catchError(handleError(this.error, 'Error retrieving bike.'))
      )
    ).subscribe();
  }

  private addBike(bike: BikeInfo): void {
    if (!this.bikes().some(b => b.id === bike.id)) {
      this.bikes.set([...this.bikes(), bike]);
    }
  }

  reset(): void {
    this.bikes.set([]);
    this.error.set('');
    this.loading.set(false);
    this.location = '';
    this.nextPage = 1;
    this.endPageReached.set(false);
  }
}
