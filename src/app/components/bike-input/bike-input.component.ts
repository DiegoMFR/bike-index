import {Component, EventEmitter, Output, signal} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-bike-input',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './bike-input.component.html',
  styleUrl: './bike-input.component.scss'
})
export class BikeInputComponent {
  @Output() searchEvent = new EventEmitter<string>();
  errorMessage = signal('');

  readonly city = new FormControl('', [Validators.required]);

  submitValue = () => {
    if (this.city.valid && this.city.value) {
      this.searchEvent.emit(this.city.value)
    }
  }

  clearValue = () => {
    this.city.setValue('');
    this.searchEvent.emit('')
  }

  updateErrorMessage() {
    if (this.city.hasError('required')) {
      this.errorMessage.set('Value required');
    } else {
      this.errorMessage.set('');
    }
  }
}
