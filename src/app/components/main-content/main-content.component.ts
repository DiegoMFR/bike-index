import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-content',
  imports: [],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
 @Input() title: string = '';
}
