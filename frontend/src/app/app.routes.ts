import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { MenuPage } from './features/menu/pages/menu-page/menu-page';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'menu', component: MenuPage, canActivate: [authGuard] },
  {
    path: 'apoderados',
    canActivate: [authGuard],
    loadChildren: () => import('./features/apoderados/apoderados.routes').then(m => m.APODERADOS_ROUTES)
  },
  { path: '**', redirectTo: '' }
];