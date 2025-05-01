import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeAttributesComponent } from './bike-attributes.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
