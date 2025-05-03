import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { GameFormComponent } from '../pages/game-form/game-form.component';
import { LibraryComponent } from '../pages/library/library.component';
import { GamePageComponent } from '../pages/game-page/game-page.component';
import { GameCardComponent } from '../components/game-card/game-card.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'library', component: LibraryComponent},
    {path: 'game', component: GamePageComponent},
    {path: 'game-form', component: GameFormComponent},
    {path: 'tests', component: GameCardComponent},
    {path: '**', redirectTo: '/home', pathMatch: 'full'},
];
