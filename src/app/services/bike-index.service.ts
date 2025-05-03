import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BikeIndexSearchParams, BikeSearchResponse, SingleBikeResponse } from '../../types';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BikeIndexService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  searchBikes(options?: { params?: BikeIndexSearchParams }): Observable<BikeSearchResponse> {
    return this.http.get<BikeSearchResponse>(`${this.baseUrl}/search`, { params: {
      ...options?.params
    } });
  }

  getBike(id: string): Observable<SingleBikeResponse>{
    return this.http.get<SingleBikeResponse>(`${this.baseUrl}/bikes/${id}`);
  }
}
