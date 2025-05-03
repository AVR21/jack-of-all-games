import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-achievement-card',
  standalone: true,
  templateUrl: './achievement-card.component.html',
  styleUrls: ['./achievement-card.component.css']
})
export class AchievementCardComponent {
  @Input() achievement!: {
    id: number;
    title: string;
    game: string;
    date: string;
    image: string;
  };
}
