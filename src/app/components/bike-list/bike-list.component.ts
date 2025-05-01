import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BikeInfo } from '../../../types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bike-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './bike-list.component.html',
  styleUrl: './bike-list.component.scss',
})
export class BikeListComponent {
  @Input() bikes: BikeInfo[] = [];
}
