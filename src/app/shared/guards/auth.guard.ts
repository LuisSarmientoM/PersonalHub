import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const canActivate = new Observable<boolean>((observer) => {
    authService.userState.subscribe((user) => {
      if (!!user) {
        observer.next(true);
      } else {
        observer.next(false);
      }
    });
  });
  return canActivate;
  // return
  //   take(1),
  //   tap((isLoggedIn) => {
  //     return !!isLoggedIn ? true : router.navigate(['/sign-in']);
  //   })
  // );
};
