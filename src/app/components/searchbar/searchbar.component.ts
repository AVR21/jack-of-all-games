import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  searchQuery = '';

  @Output() searchChange: EventEmitter<string> = new EventEmitter();

  onSearch(event: any): void {
    this.searchQuery = event.target.value;
    this.searchChange.emit(this.searchQuery);
  }
}
