import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AclService } from '@services/acl.service';
import { UserService } from '@services/user.service';

export const aclGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const aclService = inject(AclService);

  const access = route.data['access'];
  const key = route.data['key'];

  if (aclService.can(key, access)) {
    return true;
  }
  router.navigate(['/403']);
  return false;
};
