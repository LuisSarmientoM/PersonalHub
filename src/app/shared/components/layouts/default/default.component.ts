import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgFor],
  templateUrl: './default.component.html',
})
export class LayoutDefaultComponent {
  private readonly authService = inject(AuthService);

  routes = [
    {
      label: 'Home',
      path: ['/'],
      activeOptions: {
        exact: true,
      },
    },
    {
      label: 'Usuarios',
      path: ['/user'],
    },
  ];
  signOut() {
    this.authService.signOut();
  }
}
