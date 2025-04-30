import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { NotificationsComponent } from "./components/notifications/notifications.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, PageHeaderComponent, PageFooterComponent, NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
}
