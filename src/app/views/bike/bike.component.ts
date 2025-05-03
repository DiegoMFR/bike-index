import { Component, computed, inject, Input, signal } from '@angular/core';
import { MainContentComponent } from '../../components/ui/main-content/main-content.component';
import { BikeStore } from '../../stores/bikes.store';
import { BikeInfo } from '../../../types';
import { CommonModule } from '@angular/common';
import { BikeAttributesComponent } from "../../components/bike-attributes/bike-attributes.component";

@Component({
  selector: 'app-bike',
  imports: [MainContentComponent, CommonModule, BikeAttributesComponent],
  templateUrl: './bike.component.html',
  styleUrl: './bike.component.scss'
})
export class BikeComponent {
  @Input() bikeId!: string;
  readonly store= inject(BikeStore);

  bike = computed<BikeInfo | undefined>(() => this.store.bikes().find(bike => bike.id === Number(this.bikeId)))

  ngOnInit(): void {
    if (!this.bike()) {
      this.store.fetchSingleBike(this.bikeId);
    }
  }
}
