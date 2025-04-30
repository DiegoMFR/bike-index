import { TestBed } from '@angular/core/testing';
import { TrialsStore } from './bikes.store';
import { ClinicaltrialsService } from '../services/clinicaltrials.service';
import { ClinicalStudy, TrialsData } from '../../types';
import { PollingService } from '../services/polling.service';
import mockStudy from '../../utils/test-utils/mock-study.json';
import { of, throwError } from 'rxjs';

describe('TrialsStore', () => {
    let store: TrialsStore;
    let serviceSpy: jasmine.SpyObj<ClinicaltrialsService>;
    let pollingSpy: jasmine.SpyObj<PollingService>;
    const myMockStudy = mockStudy as any as ClinicalStudy;
    const myMockStudyId = myMockStudy.protocolSection.identificationModule.nctId;

    const mockResponse: TrialsData = {
        studies: [myMockStudy],
        nextPageToken: 'token123'
    };

    beforeEach(() => {
        spyOn(console, 'error');
        pollingSpy = jasmine.createSpyObj('PollingService', ['start']);
        serviceSpy = jasmine.createSpyObj('ClinicaltrialsService', ['getTrials']);

        serviceSpy.getTrials.and.returnValue(of(mockResponse));

        TestBed.configureTestingModule({
            providers: [
                TrialsStore,
                { provide: ClinicaltrialsService, useValue: serviceSpy },
                { provide: PollingService, useValue: pollingSpy }
            ]
        });

        store = TestBed.inject(TrialsStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should load studies and start the polling service', () => {
        expect(serviceSpy.getTrials).toHaveBeenCalled();
        expect(store.studies()).toEqual([myMockStudy]);
    });

    it('should handle errors from getTrials()', () => {
        serviceSpy.getTrials.and.returnValue(throwError(() => new Error('fail')));

        store.reload();

        expect(store.errors().length).toBeGreaterThan(0);
        expect(store.loading()).toBeFalse();
    });

    it('should toggle favorites correctly', () => {
        expect(store.favorites()).toEqual([]);

        store.toggleFavorite(myMockStudy);
        expect(store.favorites()).toContain(myMockStudy);
        expect(store.favoriteIds()).toContain(myMockStudyId);

        store.toggleFavorite(myMockStudy);
        expect(store.favorites()).not.toContain(myMockStudy);
        expect(store.favoriteIds()).not.toContain(myMockStudyId);
    });

    it('should fetch new trials via polling callback', () => {
        const callback = pollingSpy.start.calls.mostRecent().args[1];
        expect(typeof callback).toBe('function');
      
        const newStudy = { ...myMockStudy, protocolSection: { ...myMockStudy.protocolSection, identificationModule: { ...myMockStudy.protocolSection.identificationModule, nctId: 'NEW' } } };
        serviceSpy.getTrials.and.returnValue(of({ studies: [newStudy], nextPageToken: 'another' }));
      
        callback(); // simulate interval tick
      
        expect(store.studies()).toContain(newStudy);
      });

    it('should handle errors during polling', () => {
        const callback = pollingSpy.start.calls.mostRecent().args[1];
        expect(typeof callback).toBe('function');

        serviceSpy.getTrials.and.returnValue(throwError(() => new Error('fail')));

        callback(); // simulate interval tick

        expect(store.errors().length).toBeGreaterThan(0);
    });
});
