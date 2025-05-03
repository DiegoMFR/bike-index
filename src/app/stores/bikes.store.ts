import { Injectable, inject, signal } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BikeIndexSearchParams, BikeIndexService } from '../services/bike-index.service';
import { BikeInfo } from '../../types';
import { captureError, PAGE_SIZE, trackLoading } from './storeUtils';

@Injectable({ providedIn: 'root' })
export class BikeStore {
  private readonly bikeService = inject(BikeIndexService);

  readonly bikes = signal<BikeInfo[]>([]);
  readonly error = signal('');
  readonly loading = signal(false);
  readonly endPageReached = signal(false);
  readonly location = signal('');

  private nextPage = 2;

  private readonly baseParams: BikeIndexSearchParams = {
    stolenness: 'proximity',
    distance: '1',
    per_page: PAGE_SIZE,
  };

  private updateBikes(newBikes: BikeInfo[], append = false) {
    const updated = append ? [...this.bikes(), ...newBikes] : newBikes;
    if (append) this.nextPage++;
    this.bikes.set(updated);
    if (newBikes.length < PAGE_SIZE) this.endPageReached.set(true);
  }

  fetchBikes(location: string): void {
    this.reset();
    this.location.set(location);
    this.error.set('');
    trackLoading(
      this.bikeService.searchBikes({ params: { ...this.baseParams, location } }).pipe(
        tap(res => this.updateBikes(res.bikes)),
        catchError(captureError(this.error, 'Error retrieving bikes.'))
      ),
      this.loading
    ).subscribe();
  }

  fetchMoreBikes(): void {
    console.log(this.nextPage);

    if (this.endPageReached() || !this.location()) return;
    this.error.set('');
    trackLoading(
      this.bikeService.searchBikes({
        params: { ...this.baseParams, location: this.location(), page: this.nextPage }
      }).pipe(
        tap(res => this.updateBikes(res.bikes, true)),
        catchError(captureError(this.error, 'Error retrieving more bikes.'))
      ),
      this.loading
    ).subscribe();
  }

  fetchSingleBike(id: string): void {
    this.error.set('');
    trackLoading(
      this.bikeService.getBike(id).pipe(
        tap(res => res.bike && this.addBike(res.bike)),
        catchError(captureError(this.error, 'Bike not found.'))
      ),
      this.loading
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
    this.location.set('');
    this.nextPage = 2;
    this.endPageReached.set(false);
  }
}
