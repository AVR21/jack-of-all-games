import { Component, OnInit, signal } from '@angular/core';
import { Game } from '../../models/game';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../../services/games/games.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-game-page',
  imports: [],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent implements OnInit{

  isEnable = false;
  protected game!: Game;
  protected imgPath = '';
  protected videoURL!: SafeResourceUrl;
  protected hasVideo = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const gameId = params['gid'];

      if(gameId) {
        this.gamesService.getGameById(gameId).subscribe(game => {
          this.game = game;
          if(this.game.media.video){
            this.hasVideo.set(true);
            this.getVideo();
          }
          this.getImage();
        })
      } else {
        console.log('No se ha pasado un identificador de videojuego o el identificador pasado no es válido. gameID =',
           gameId ? gameId: 'nulo')
        this.router.navigate(['home']);
      }
    });
  }

  getImage() {
    this.imgPath = this.game.media.img?. [1] ?? 'public/images/logo.png';
  }

  getVideo() {    
    if(this.game.media.video){
    this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.game.media.video);
    console.log(this.videoURL);
    }
  }

}
