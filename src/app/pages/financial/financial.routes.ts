import { Routes } from '@angular/router';
import { FinancialComponent } from './financial.component';
import { ResumeComponent } from './resume/resume.component';

const routes: Routes = [
  {
    path: '',
    component: FinancialComponent,
    children: [
      {
        path: '',
        component: ResumeComponent,
      },
    ],
  },
];

export default routes;
