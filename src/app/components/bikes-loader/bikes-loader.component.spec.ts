import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikesLoaderComponent } from './bikes-loader.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BikesLoaderComponent', () => {
  let component: BikesLoaderComponent;
  let fixture: ComponentFixture<BikesLoaderComponent>;

  beforeEach(async () => {
    spyOn(console, 'error');
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [provideHttpClient(), provideHttpClientTesting()],
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

  it('should render the app-trials-list component', () => {
    const compiled = fixture.nativeElement;
      expect(compiled.querySelector('app-trials-list')).toBeTruthy();
    }
  );
  it('should inject the TrialsStore', () => {
      expect(component.store).toBeTruthy();
    }
  );
});
