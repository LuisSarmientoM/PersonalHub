import { Injectable, inject } from '@angular/core';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class AclService {
  private userService = inject(UserService);

  can(key: string, permission: string): boolean {
    const user = this.userService.currentUserValue;

    if (!permission || permission === '*') return true;
    if (!user.acl) return false;
    return user.acl[key].includes(permission);
  }

  /**
   * Check current user is one of argument access.
   * @param roles
   * @returns boolean
   */
  isRole(access: string[]): boolean {
    const user = this.userService.currentUserValue;
    if (!access || !user) return false;
    const aclString = JSON.stringify(user.acl);

    return access.some((role) => aclString.indexOf(role) >= 0);
  }
}
