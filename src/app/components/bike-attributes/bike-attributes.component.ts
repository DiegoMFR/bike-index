import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BikeInfo } from '../../../types';

@Component({
  selector: 'app-bike-attributes',
  imports: [CommonModule],
  templateUrl: './bike-attributes.component.html',
  styleUrl: './bike-attributes.component.scss'
})
export class BikeAttributesComponent {
  @Input({ required: true }) bike!: BikeInfo;
}
