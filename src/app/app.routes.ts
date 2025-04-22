import { Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { AchievementCardComponent } from './achievement-card/achievement-card.component';

export const routes: Routes = [
    {path: 'footer', component: FooterComponent},
    {path: 'achievement-card', component: AchievementCardComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];
