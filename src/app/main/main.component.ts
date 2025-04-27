import { Component } from '@angular/core';
import {CarouselComponent} from './carousel/carousel.component';
import {SearchbarComponent} from '../components/searchbar/searchbar.component';

@Component({
  selector: 'app-main',
  imports: [CarouselComponent, SearchbarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
