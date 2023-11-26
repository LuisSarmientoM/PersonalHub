import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { format, lastDayOfMonth } from 'date-fns';
import { enUS, es } from 'date-fns/locale';

import {
  DateFnsAdapter,
  MatDateFnsModule,
} from '@angular/material-date-fns-adapter';

const dateInput = 'dd/MMM/yyyy';
export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: dateInput,
  },
  display: {
    dateInput: dateInput,
    monthYearLabel: 'MMMM',
    dateA11yLabel: 'dd',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};
@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarComponent,
    RouterLink,
    RouterLinkActive,
    MatDatepickerModule,
    FormsModule,
    MatDateFnsModule,
  ],
  templateUrl: 'financial.component.html',
  styles: [
    `
      :host {
        height: 100cqh;
        display: block;
      }
    `,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: es,
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE],
    },
  ],
})
export class FinancialComponent implements OnInit {
  startDate!: Date;
  endDate!: Date;
  ngOnInit(): void {
    this.getCurrentMonth();
  }
  getCurrentMonth() {
    const today = new Date();
    this.startDate = new Date(format(today, 'yyyy MM 01'));
    this.endDate = new Date(format(lastDayOfMonth(today), 'yyyy MM dd'));
  }
}
