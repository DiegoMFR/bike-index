import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainContentComponent } from "../../components/ui/main-content/main-content.component";

@Component({
  selector: 'app-page-not-found',
  imports: [MainContentComponent, RouterLink],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

}
