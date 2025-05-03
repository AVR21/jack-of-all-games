import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GamesService } from '../../services/games/games.service';
import { Game } from '../../model/game';
import { Platforms } from '../../model/platforms';

@Component({
  selector: 'app-game-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.css',
  standalone: true
})
export class GameFormComponent {
  protected form: any;

  constructor(private fb: FormBuilder, private gamesService: GamesService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      platform: [[]],
      imgVertical: [''],
      imgHorizontal: [''],
      video: [''],
      company: ['', Validators.required],
      description: ['', Validators.required],
      score: [0, [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  protected platforms = Platforms;
  protected platformsKeys = Object.keys(this.platforms);
  selectedPlatforms = new Set<string>();

  loading = signal(false);
  success = signal(false);

  

  onPlatformChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.selectedPlatforms.add(input.value);
    } else {
      this.selectedPlatforms.delete(input.value);
    }
    this.form.get('platform')?.setValue(Array.from(this.selectedPlatforms));
  }

  submitForm() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.success.set(false);

    const value = this.form.value;
    const images = [value.imgVertical, value.imgHorizontal].filter(Boolean);

    const newGame: Game = {
      title: value.title!,
      platform: value.platform!,
      description: value.description!,
      company: value.company,
      score: value.score!,
      media: {
        img: images.length > 0 ? images : [],
        video: value.video || null
      }
    };

    this.gamesService.addGame(newGame).then(() => {
      this.success.set(true);
      this.form.reset();
      this.selectedPlatforms.clear();
    }).finally(() => {
      this.loading.set(false);
    });
  }
}