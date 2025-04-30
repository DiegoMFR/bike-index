import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ provideRouter(routes) ],
      imports: [PageNotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show the 404 error message', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('Page Not Found | 404');
    }
  );
});
