import { Component, inject, signal } from '@angular/core';
import { MainContentComponent } from "../../components/ui/main-content/main-content.component";
import { BikeStore } from '../../stores/bikes.store';
import { CommonModule } from '@angular/common';
import { BikesLoaderComponent } from "../../components/bikes-loader/bikes-loader.component";
import { BikeInputComponent } from "../../components/bike-input/bike-input.component";
import { LoadMoreComponent } from "../../components/load-more/load-more.component";

@Component({
  selector: 'app-home',
  imports: [MainContentComponent, CommonModule, BikesLoaderComponent, BikeInputComponent, LoadMoreComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  readonly store= inject(BikeStore);
}
