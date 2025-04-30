import { Component, inject } from '@angular/core';
import { BikeListComponent } from '../bike-list/bike-list.component';
import { BikeStore } from '../../stores/bikes.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bikes-loader',
  imports: [BikeListComponent, CommonModule],
  templateUrl: './bikes-loader.component.html',
  styleUrl: './bikes-loader.component.scss',
  standalone: true,
})
export class BikesLoaderComponent {
  readonly store= inject(BikeStore);
}
