import { Injectable, inject, signal } from '@angular/core';
import { catchError, finalize, tap } from 'rxjs/operators';
import { BikeIndexService } from '../services/bike-index.service';
import { BikeInfo } from '../../types';
import { handleError } from './storeUtils';

@Injectable({ providedIn: 'root' })
export class BikeStore {

  private readonly bikeService = inject(BikeIndexService);

  readonly bikes = signal<BikeInfo[]>([]);
  readonly error = signal<string>('');
  readonly loading = signal<boolean>(false);
  
  private nextPageToken = 1;

  public fetchBikes(city: string) {
    this.loading.set(true);
    this.bikeService.searchByProximity(city).pipe(
      tap(res => {
        this.bikes.set(res.bikes);
      }),
      catchError(handleError(this.error, 'Error retrieving bikes. Please try again later.')),
      finalize(() => {this.loading.set(false);})
    ).subscribe();
  }

  public fetchSingleBike(id: string) {
    this.loading.set(true);
    this.bikeService.getBike(id).pipe(
      tap(res => {
        if (res.bike) {
          this.addBikeToQueue(res.bike);
        }
      }),
      catchError(handleError(this.error, 'Error retrieving bike.')),
      finalize(() => {this.loading.set(false);})
    ).subscribe();
  }

  private addBikeToQueue(newBike: BikeInfo) {
   const bikes = this.bikes();
    if (!bikes.includes(newBike)) {
      this.bikes.set([...bikes, newBike]);
    }
  }

  public reset(): void {
    this.loading.set(false);
    this.error.set('');
    this.bikes.set([]);
  }
}
