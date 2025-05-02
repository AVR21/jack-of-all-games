import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { CoverCardComponent } from '../components/cover-card/cover-card.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'library', redirectTo: '/home'},
    {path: 'test-components', component: CoverCardComponent},
    {path: '*', redirectTo: '/home', pathMatch: 'full'},
];
