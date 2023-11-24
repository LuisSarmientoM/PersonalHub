import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { HasRoleDirective } from '@shared/directives/has-role.directive';
import { UiService } from '@services/ui.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HasRoleDirective,
    NgClass,
  ],
  templateUrl: './default.component.html',
  styles: [
    `
      .hide {
        @apply absolute -translate-x-full md:relative md:translate-x-0;
      }
      .show {
        @apply translate-x-0 top-0 bottom-0 h-full w-52 fixed md:relative;
      }
    `,
  ],
})
export class LayoutDefaultComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly uiService = inject(UiService);
  isOpenSidebar = false;
  routeList = [
    {
      label: 'Home',
      path: ['/'],
      activeOptions: {
        exact: true,
      },
      access: '*',
    },
    {
      label: 'Usuarios',
      path: ['user'],
      access: ['user.write'],
    },
    {
      label: 'Financiero',
      path: ['financial'],
      access: '*',
    },
  ];

  ngOnInit(): void {
    this.uiService.getNavbarState().subscribe((navbar) => {
      this.isOpenSidebar = navbar;
    });
  }
  get openClass() {
    return this.isOpenSidebar ? 'show' : 'hide';
  }

  signOut() {
    this.authService.signOut();
  }

  toggleSidebar() {
    if (!this.isOpenSidebar) {
      this.uiService.toggleNavbar();
    }
    this.uiService.toggleNavbar();
  }

  @HostListener('document:keydown.escape')
  hideSidebar() {
    this.uiService.toggleNavbar(false);
  }
}
