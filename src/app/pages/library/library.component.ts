import { Component } from '@angular/core';
import { SearchbarComponent } from "../../components/searchbar/searchbar.component";
import { CoverCardComponent } from "../../components/cover-card/cover-card.component";
import { AuthService } from '../../services/auth/auth.service';
import { GamesService } from '../../services/games/games.service';
import { Game } from '../../model/game';

@Component({
  selector: 'app-library',
  imports: [SearchbarComponent, CoverCardComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent {

  protected gamesList: Game[] = [];
  

  constructor(private authService: AuthService, private gamesService: GamesService) {
    this.gamesService.getGames().subscribe((res) => {
      this.gamesList = res;
    })
  }

  getImage(game: Game): string {
    if (game.media?.img) {
      return game.media.img[0];
    } else {
      return "/public/images/logo.png";
    }
  }

}
