import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-load-more',
  imports: [CommonModule],
  templateUrl: './load-more.component.html',
  styleUrl: './load-more.component.scss'
})
export class LoadMoreComponent {
@Input() isEndReached: boolean = false;
@Output() loadMoreEvent = new EventEmitter<null>();
}
