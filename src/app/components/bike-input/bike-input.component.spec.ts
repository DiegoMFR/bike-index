import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeInputComponent } from './bike-input.component';

describe('BikeInputComponent', () => {
  let component: BikeInputComponent;
  let fixture: ComponentFixture<BikeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BikeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
