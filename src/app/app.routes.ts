import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./views//home/home.component').then(mod => mod.HomeComponent), title: 'Bikes | Swapfiets' },
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent, title: 'Page not found | 404' },
];
