import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/ui/page-header/page-header.component';
import { PageFooterComponent } from './components/ui/page-footer/page-footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, PageHeaderComponent, PageFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
}
