import {Component, signal} from '@angular/core';
import {CarouselComponent} from './carousel/carousel.component';
import {SearchbarComponent} from '../../components/searchbar/searchbar.component';
import { GamesService } from '../../services/games/games.service';
import { Router } from '@angular/router';
import { Game } from '../../models/game';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-main',
  imports: [CarouselComponent, SearchbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  //protected gamesTitles: string[] = [];
  protected gamesList!: Game[];
  
  constructor(
    private auth: AuthService,
    private gamesService: GamesService,
    private router: Router,
    ) {
      this.gamesService.getGames().subscribe(data => {
        //this.gamesTitles = data.map(game => game.title);
        this.gamesList = data;
      });
  }
    
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
