import { Routes } from '@angular/router';
import UserListComponent from './user-list/user-list.component';
import { UserComponent } from './user.component';
import { aclGuard } from '@shared/guards/acl.guard';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: { key: 'user', access: 'user.read' },
    canActivate: [aclGuard],
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: 'create',
        component: FormComponent,
      },
    ],
  },
];

export default routes;
