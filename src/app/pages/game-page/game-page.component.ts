import { Component, OnInit, signal } from '@angular/core';
import { Game } from '../../models/game';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../../services/games/games.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Platforms } from '../../models/platforms';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent implements OnInit {

  protected game!: Game;
  protected imgPath = '';
  protected videoURL!: SafeResourceUrl;
  protected hasVideo = signal(false);
  protected platforms = signal('');
  isExpanded = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const gameId = params['gid'];

      if (gameId) {
        this.gamesService.getGameById(gameId).subscribe(game => {
          this.game = game;

          if (this.game.media?.video) {
            this.hasVideo.set(true);
            this.getVideo();
          }

          this.getImage();
          this.getPlatforms();
        });
      } else {
        this.router.navigate(['home']);
      }
    });
  }

  getImage() {
    this.imgPath = this.game.media?.img?.[1] ?? 'assets/logo.png';
  }

  getVideo() {
    if (this.game.media?.video) {
      this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.game.media.video);
    }
  }

  toggleDescription() {
    this.isExpanded.update(v => !v);
  }

  getPlatforms(): void {
    if (!Array.isArray(this.game.platform)) return;
  
    const names = this.game.platform
      .map((code: string) => Platforms[code.trim()] || code.trim())
      .join(', ');
  
    this.platforms.set(names); 
  }  
}
