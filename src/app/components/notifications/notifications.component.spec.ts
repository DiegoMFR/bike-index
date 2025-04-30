import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TrialsStore } from '../../stores/bikes.store';
import { signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

class MockTrialsStore {
  errors = signal<string[]>(['mock error']);
}

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async () => {
    spyOn(console, 'error');
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
      imports: [NotificationsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger a snackBar notification when an error occurs', () => {
    const snackBar = TestBed.inject(MatSnackBar);
    const store = TestBed.inject(TrialsStore) as MockTrialsStore;
    const openSpy = spyOn(snackBar, 'open');
    store.errors.set(['Test error']);

    fixture.detectChanges();

    expect(openSpy).toHaveBeenCalledWith('Test error', 'Close', jasmine.objectContaining({
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    }));
  });
});
