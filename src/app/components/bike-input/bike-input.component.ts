import {Component, inject, signal} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BikeStore } from '../../stores/bikes.store';


@Component({
  selector: 'app-bike-input',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './bike-input.component.html',
  styleUrl: './bike-input.component.scss'
})
export class BikeInputComponent {
  errorMessage = signal('');
  readonly store = inject(BikeStore);

  readonly city = new FormControl('', [Validators.required]);

  submitValue = () => {
    if (this.city.valid && this.city.value) {
      this.store.fetchBikes(this.city.value);
    }
  }

  clearValue = () => {
    this.city.setValue('');
    this.store.reset();
  }

  updateErrorMessage() {
    if (this.city.hasError('required')) {
      this.errorMessage.set('You must enter a city');
    } else {
      this.errorMessage.set('');
    }
  }

  ngOnInit(): void {
    const location = this.store.location();
    if (location) {
      this.city.setValue(location);
    }
  }
}
