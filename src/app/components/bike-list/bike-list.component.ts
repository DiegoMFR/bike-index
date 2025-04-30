import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BikeInfo } from '../../../types';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-bike-list',
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './bike-list.component.html',
  styleUrl: './bike-list.component.scss',
})
export class BikeListComponent {
  @Input() bikes: BikeInfo[] = [];

  displayedColumns: string[] = ['cycle_type_slug', 'serial', 'frame_model'];
}
