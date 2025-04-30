import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikeListComponent } from './bike-list.component';
import clinicalStudyMock from '../../../utils/test-utils/mock-study.json';
import { ClinicalStudy } from '../../../types';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('BikeListComponent', () => {
  let component: BikeListComponent;
  let fixture: ComponentFixture<BikeListComponent>;
  const mock = clinicalStudyMock as any as ClinicalStudy;
  const mockId = mock.protocolSection.identificationModule.nctId;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BikeListComponent);
    component = fixture.componentInstance;
    component.favoriteIds = signal([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the loading message when loading', () => {
    component.loading = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent.trim()).toBe('Loading studies...');
  });

  it('should render the studies list when not loading', () => {
    component.loading = false;
    component.studies = [mock];
    
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('li').length).toBe(1);
    expect(compiled.querySelector('mat-card-subtitle').textContent).toContain('Test institute name');
  });

  it('should render the empty message when no studies', () => {
    component.loading = false;
    component.studies = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent.trim()).toBe('No studies found.');
  });

  it('should correctly evaluate isFavorite', () => {
    component.favoriteIds = signal([mockId]);
    expect(component.isFavorite(mock)).toBeTrue();
  
    component.favoriteIds = signal([]);
    expect(component.isFavorite(mock)).toBeFalse();
  });

  it('should emit favoritesEvent when a TrialListItemComponent emits favoritesEvent', () => {
    spyOn(component.favoritesEvent, 'emit');
    component.studies = [mock];
    component.favoriteIds = signal([]);
    fixture.detectChanges();
  
    const child = fixture.debugElement.query(By.css('[data-testid="trial-item"]'));
  
    child.triggerEventHandler('favoritesEvent', mock);
  
    expect(component.favoritesEvent.emit).toHaveBeenCalledWith(mock);
  });
});
