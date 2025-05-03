import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { GameFormComponent } from '../pages/game-form/game-form.component';
import { LibraryComponent } from '../pages/library/library.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'library', component: LibraryComponent},
    {path: 'game-form', component: GameFormComponent},
    {path: '*', redirectTo: '/home', pathMatch: 'full'},
];
