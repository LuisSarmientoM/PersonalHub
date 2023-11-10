import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { Observable, Subscription, take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
})
export default class SignInComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  userState = new Subscription();
  form = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,

      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  ngOnInit(): void {
    this.userState = this.authService.userState.subscribe((isLoggedIn) => {
      if (!!isLoggedIn) {
        this.router.navigate(['/']);
      }
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log('form is valid');

      this.signIn();
    }
  }

  async signIn() {
    const { email, password } = this.form.getRawValue();
    await this.authService.signIn(email, password);
  }

  ngOnDestroy(): void {
    this.userState.unsubscribe();
  }
}
