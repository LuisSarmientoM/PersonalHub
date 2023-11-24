import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, RouterLink, RouterLinkActive],
  templateUrl: 'financial.component.html',
  styles: [
    `
      :host {
        height: 100cqh;
        display: block;
      }
    `,
  ],
})
export class FinancialComponent {}
