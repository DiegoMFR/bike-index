import { Component, effect, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifications',
  standalone: true,
  template: '',
  styles: [],
})
export class NotificationsComponent {
  private readonly store = [];
  private readonly snackBar = inject(MatSnackBar);

  constructor() {
  }
}
