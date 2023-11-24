import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiService } from '@services/ui.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styles: ``,
})
export class ToolbarComponent {
  private uiService = inject(UiService);

  toggleSidebar() {
    this.uiService.toggleNavbar();
  }
}
