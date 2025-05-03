import {Component, signal} from '@angular/core';
import {CarouselComponent} from './carousel/carousel.component';
import {SearchbarComponent} from '../../components/searchbar/searchbar.component';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-main',
  imports: [CarouselComponent, SearchbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private auth: AuthService) {}
  isRegistered = signal(false);
  ngOnInit()
  {
    this.auth.getAuthState().subscribe(state =>
    {
      if (state)
      {
        this.isRegistered.set(true);
        console.log("conexion logout bien");
      } else
      {
        console.log("conexion logout mal");
        this.isRegistered.set(false);
      }
    })
  }
}
