import { Component, OnInit } from '@angular/core';
import { SearchbarComponent } from "../../components/searchbar/searchbar.component";
import { CoverCardComponent } from "../../components/cover-card/cover-card.component";
import { AuthService } from '../../services/auth/auth.service';
import { GamesService } from '../../services/games/games.service';
import { Game } from '../../models/game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  imports: [SearchbarComponent, CoverCardComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit{

  protected searchQuery: string = '';

  protected gamesList: Game[] = [];

  constructor(
    private authService: AuthService, 
    private gamesService: GamesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gamesService.getGames().subscribe((data) => {
      this.gamesList = data;
    });
  }

  get filteredGames() {
    const query = this.searchQuery.trim().toLowerCase();
  
    if (query.startsWith('name:')) {
      const nameQuery = query.replace('name:', '').trim();
      return this.gamesList.filter(game =>
        game.title.toLowerCase().includes(nameQuery)
      );
    }
  
    if (query.startsWith('company:')) {
      const companyQuery = query.replace('company:', '').trim();
      return this.gamesList.filter(game =>
        game.company?.toLowerCase().includes(companyQuery)
      );
    }
  
    // Si no hay prefijo, buscar en ambos campos
    return this.gamesList.filter(img =>
      img.title?.toLowerCase().includes(query) ||
      img.company?.toLowerCase().includes(query)
    );
  }
  

  onSearch(query: string) {
    this.searchQuery = query;
  }

  getImage(game: Game): string {
    if (game.media?.img) {
      return game.media.img[0];
    } else {
      return "/public/images/logo.png";
    }
  }

  selectCard(route: string, params = []) {
    this.router.navigate([route]);
  }

}
