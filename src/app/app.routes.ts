import { Routes } from '@angular/router';
import { UserComponent } from '@pages/user/user.component';
import { LayoutDefaultComponent } from '@shared/components/layouts/default/default.component';
import { aclGuard } from '@shared/guards/acl.guard';
import { authGuard } from '@shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: LayoutDefaultComponent,
    children: [
      {
        path: '',
        canActivate: [aclGuard],
        loadComponent: () => import('@pages/home/home.component'),
      },
      {
        path: 'user',
        loadChildren: () => import('@pages/user/user.routes'),
      },
      {
        path: 'financial',
        loadChildren: () => import('@pages/financial/financial.routes'),
      },
    ],
  },
  {
    path: 'sign-in',
    loadComponent: () => import('@pages/auth/sign-in/sign-in.component'),
  },
  {
    path: '403',
    loadComponent: () => import('@pages/unauthorize/unauthorize.component'),
  },
];
