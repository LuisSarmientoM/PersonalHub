import { Routes } from '@angular/router';
import { LayoutDefaultComponent } from '@shared/components/layouts/default/default.component';
import { authGuard } from '@shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: LayoutDefaultComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@pages/home/home.component'),
      },
      {
        path: 'user',
        loadChildren: () => import('@pages/user/user.routes'),
      },
    ],
  },
  {
    path: 'sign-in',
    loadComponent: () => import('@pages/auth/sign-in/sign-in.component'),
  },
];
