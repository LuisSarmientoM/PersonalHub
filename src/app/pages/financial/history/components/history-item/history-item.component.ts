import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';

// Create a type of the history object
type Movement = 'income' | 'expense';

@Component({
  selector: 'app-history-item',
  standalone: true,
  imports: [DatePipe, NgClass, CurrencyPipe],
  templateUrl: './history-item.component.html',
  styles: ``,
})
export class HistoryItemComponent {
  @Input({ required: true }) history!: {
    date: Date;
    description: string;
    category: string;
    amount: number;
    budget: string;
    type: Movement;
  };

  get colorType(): string {
    return this.history.type === 'income'
      ? 'text-indigo-500 rotate-180'
      : 'text-rose-500';
  }
}
