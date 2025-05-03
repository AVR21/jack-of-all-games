import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cover-card',
  imports: [],
  templateUrl: './cover-card.component.html',
  styleUrl: './cover-card.component.css'
})
export class CoverCardComponent{

  @Input() title: string | undefined = "";
  @Input() imgPath: string = "";

  constructor() {}


}
