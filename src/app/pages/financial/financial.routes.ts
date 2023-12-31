import { Routes } from '@angular/router';
import { FinancialComponent } from './financial.component';
import { ResumeComponent } from './resume/resume.component';

const routes: Routes = [
  {
    path: '',
    component: FinancialComponent,
    children: [
      {
        path: 'resume',
        component: ResumeComponent,
      },
      {
        path: 'budget',
        loadComponent: () => import('./budget/budget.component'),
      },
      {
        path: 'history',
        loadComponent: () => import('./history/history.component'),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'resume',
      },
    ],
  },
  // ],
  // },
];

export default routes;
