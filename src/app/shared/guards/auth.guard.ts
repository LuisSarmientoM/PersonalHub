import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Observable, take, tap } from 'rxjs';

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
  }).pipe(
    take(1),
    tap((isLoggedIn) => {
      if (!isLoggedIn) authService.signOut();
    })
  );
  return canActivate;
  // return

  // );
};
