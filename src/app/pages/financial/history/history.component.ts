import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewComponent } from '@shared/components/list/list-view.component';
import { HistoryItemComponent } from './components/history-item/history-item.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, ListViewComponent, HistoryItemComponent],
  templateUrl: './history.component.html',
  styles: ``,
})
export default class HistoryComponent {
  budgets = [
    'Home',
    'Hobbies',
    'Health',
    'Transportation',
    'Services',
    'Other',
  ];
  history = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(),
    description: `Description ${i}`,
    category: 'Category',
    amount: Math.random() * 1000,
    budget: this.budgets[Math.floor(Math.random() * this.budgets.length)],
    type: Math.random() > 0.5 ? 'income' : 'expense',
  }));
}
