import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { GameFormComponent } from '../components/game-form/game-form.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'library', redirectTo: '/home'},
    {path: 'game-form', component: GameFormComponent},
    {path: '*', redirectTo: '/home', pathMatch: 'full'},
];
