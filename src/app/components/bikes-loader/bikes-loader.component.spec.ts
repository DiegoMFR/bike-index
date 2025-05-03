import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikesLoaderComponent } from './bikes-loader.component';
import { BikeStore } from '../../stores/bikes.store';
import { ActivatedRoute } from '@angular/router';
import { mockActivatedRoute, MockBikeStore } from '../../../utils/test-utils/mockApis';


describe('BikesLoaderComponent', () => {
  let component: BikesLoaderComponent;
  let fixture: ComponentFixture<BikesLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: BikeStore, useClass: MockBikeStore },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
      imports: [BikesLoaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BikesLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject the BikesStore', () => {
      expect(component.store).toBeTruthy();
    }
  );

  it('should show the bikes list if the store has bikes', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-bike-list')).toBeTruthy();
  });
});
