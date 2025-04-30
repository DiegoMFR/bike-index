import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    spyOn(console, 'error');
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [provideHttpClient(), provideHttpClientTesting()],
      imports: [HomeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
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
