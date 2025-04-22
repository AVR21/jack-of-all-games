import { Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { AchievementCardComponent } from './achievement-card/achievement-card.component';
import {MainComponent} from './main/main.component';

export const routes: Routes = [
    {path: 'footer', component: FooterComponent},
    {path: 'achievement-card', component: AchievementCardComponent},
    {path:'home', component: MainComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];
