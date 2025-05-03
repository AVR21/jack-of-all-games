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
  protected videoURL!: SafeResourceUrl;

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
            this.getVideo(this.game.media.video);
          }
        })
      } else {
        console.log('No se ha pasado un identificador de videojuego o el identificador pasado no es válido. gameID =',
           gameId ? gameId: 'nulo')
        this.router.navigate(['home']);
      }
    });
  }

  get hasVideo() {
    console.log(this.game.media.video);
    return this.game.media.video ? true : false;
  }

  getImage() {
    if(this.game.media.img)
      return this.game.media.img[1];
    else  return '/public/images/logo.png';
  }

  getVideo(video: string) {
    this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(video);
  }

}
