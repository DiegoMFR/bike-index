import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMoreComponent } from './load-more.component';
import { By } from '@angular/platform-browser';

describe('LoadMoreComponent', () => {
  let component: LoadMoreComponent;
  let fixture: ComponentFixture<LoadMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadMoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Load more" button when isEndReached is false', () => {
    component.isEndReached = false;
    fixture.detectChanges();

    const loadMoreButton = fixture.debugElement.query(By.css('button'));
    expect(loadMoreButton).toBeTruthy();
    expect(loadMoreButton.nativeElement.textContent).toBe('Load more');
  });

  it('should display "No more items to load" when isEndReached is true', () => {
    component.isEndReached = true;
    fixture.detectChanges();

    const noMoreItemsSpan = fixture.debugElement.query(By.css('span'));
    expect(noMoreItemsSpan).toBeTruthy();
    expect(noMoreItemsSpan.nativeElement.textContent).toBe('No more items to load');
  });

  it('should emit loadMoreEvent when "Load more" button is clicked', () => {
    component.isEndReached = false;
    spyOn(component.loadMoreEvent, 'emit');

    fixture.detectChanges();
    const loadMoreButton = fixture.debugElement.query(By.css('button'));
    loadMoreButton.nativeElement.click();

    expect(component.loadMoreEvent.emit).toHaveBeenCalled();
  });

  it('should not show the load more button when "No more items" is displayed', () => {
    component.isEndReached = true;

    fixture.detectChanges();

    const loadMoreButton = fixture.debugElement.query(By.css('button'));
    expect(loadMoreButton).toBeFalsy();
  });
});
