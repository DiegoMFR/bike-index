import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BikeSearchResponse, SingleBikeResponse } from '../../types';

interface bikeIndexSearchParams {
  page?: number,
  per_page?: number,
  location?: string,
  stolenness?: 'non' | 'stolen' | 'proximity',
  distance?: string,
}

@Injectable({ providedIn: 'root' })
export class BikeIndexService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/bike-api';

  searchBikes(options?: { params?: bikeIndexSearchParams }): Observable<BikeSearchResponse> {
    return this.http.get<BikeSearchResponse>(`${this.apiUrl}/search`, { params: {
      ...options?.params
    } });
  }
  
  searchByProximity(location: string): Observable<BikeSearchResponse> {
    const params: bikeIndexSearchParams = {
      stolenness: 'proximity',
      distance: "1",
      location,
    }

    return this.searchBikes({ params })
  }

  getBike(id: string): Observable<SingleBikeResponse>{
    return this.http.get<SingleBikeResponse>(`${this.apiUrl}/bikes/${id}`);
  }
}
