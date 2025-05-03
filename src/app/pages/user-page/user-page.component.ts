import { Component, computed, signal } from '@angular/core';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { CoverCardComponent } from '../../components/cover-card/cover-card.component';
import { AchievementCardComponent } from '../../components/achievement-card/achievement-card.component';
import { AuthService } from '../../services/auth/auth.service';
import { GamesService } from '../../services/games/games.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [SearchbarComponent, CoverCardComponent, AchievementCardComponent],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  
  user = signal<any>(null);

  allGames = signal<any[]>([]);

  favoriteGames = computed(() =>
    this.allGames().filter(game => game.isFavorite)
  );

  achievements = signal([
    {
      id: 1,
      title: 'First Blood',
      game: 'Game A',
      date: '2025-04-12 15:30',
      image: 'assets/achievements/first-blood.png'
    },
    {
      id: 2,
      title: 'Master Explorer',
      game: 'Game B',
      date: '2025-04-20 19:00',
      image: 'assets/achievements/explorer.png'
    }
  ]);

  constructor(
    private authService: AuthService,
    private gamesService: GamesService
  ) {
    this.user.set(this.authService.user());
  }

  selectGame(gameId: number): void {
    console.log('Selected game:', gameId);
  }

  getImage(game: any): string {
    return game.media?.img?.[0] || '/public/images/logo.png';
  }
}
