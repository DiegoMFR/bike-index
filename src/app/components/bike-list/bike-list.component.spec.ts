import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikeListComponent } from './bike-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BikeListComponent', () => {
  let component: BikeListComponent;
  let fixture: ComponentFixture<BikeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [BikeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BikeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
