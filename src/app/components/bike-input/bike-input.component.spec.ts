import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikeInputComponent } from './bike-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BikeStore } from '../../stores/bikes.store';
import { MockBikeStore } from '../../../utils/test-utils/mockApis';

describe('BikeInputComponent', () => {
  let component: BikeInputComponent;
  let fixture: ComponentFixture<BikeInputComponent>;
  let store: MockBikeStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BikeInputComponent],
      providers: [{ provide: BikeStore, useClass: MockBikeStore }]
    }).compileComponents();

    fixture = TestBed.createComponent(BikeInputComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(BikeStore) as unknown as MockBikeStore;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize city input with store location', () => {
    expect(component.city.value).toBe('Test City');
  });

  it('should call fetchBikes on submit if city is valid', () => {
    component.city.setValue('Amsterdam');
    component.submitValue();
    expect(store.fetchBikes).toHaveBeenCalledWith('Amsterdam');
  });

  it('should not call fetchBikes on submit if city is invalid', () => {
    component.city.setValue('');
    component.submitValue();
    expect(store.fetchBikes).not.toHaveBeenCalled();
  });

  it('should clear value and reset store on clear', () => {
    component.city.setValue('Berlin');
    component.clearValue();
    expect(component.city.value).toBe('');
    expect(store.reset).toHaveBeenCalled();
  });

  it('should show error message if city is touched and invalid', () => {
    component.city.markAsTouched();
    component.city.setValue('');
    component.updateErrorMessage();
    fixture.detectChanges();
    const errorEl = fixture.debugElement.query(By.css('.error-message'));
    expect(errorEl.nativeElement.textContent).toContain('You must enter a city');
  });
});
