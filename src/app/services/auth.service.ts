import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  authState,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  get userState() {
    return authState(this.auth);
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      const { user } = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.userService.getUser(user.uid);
    } catch (error) {
      console.error('Google login', error);
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut().then(() => {
        this.router.navigate(['/sign-in']);
      });
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async createUser({
    email,
    password,
    displayName,
  }: {
    email: string;
    password: string;
    displayName: string;
  }) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      updateProfile(user, {
        displayName,
      });
      await sendEmailVerification(user);
      // await this.sendEmailVerification(user);
    } catch (error) {
      console.error('Google signUp', error);
    }
    // this.router.navigate(['/user/email-verification']);
  }

  private checkUserIsVerified(user: User): void {
    const route = user.emailVerified ? '/' : '/user/email-verification';
    this.router.navigate([route]);
  }
}
