import { ComponentFixture, TestBed } from '@angular/core/testing';
import mockBike from '../../../utils/test-utils/mock-bike.json';

import { BikeAttributesComponent } from './bike-attributes.component';
import { BikeInfo } from '../../../types';
const myMockBike = mockBike as BikeInfo;

describe('BikeAttributesComponent', () => {
  let component: BikeAttributesComponent;
  let fixture: ComponentFixture<BikeAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeAttributesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BikeAttributesComponent);
    component = fixture.componentInstance;
    component.bike = myMockBike;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
