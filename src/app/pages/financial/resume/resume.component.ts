import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { TooltipDirective } from 'tooltip';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CurrencyPipe, TooltipDirective, DatePipe, ToolbarComponent],
  templateUrl: './resume.component.html',
  styles: ``,
})
export class ResumeComponent {
  budgets = [
    {
      budget: 'Home',
      summarize:
        'Home, utilities, rent/mortgage, home maintenance, groceries, pet',
      balance: 10000,
      spent: 5000,
      remaining: 5000,
    },
    {
      budget: 'Hobbies',
      summarize: 'hobbies, dinning out, Entertainment, cine, coffee',
      balance: 10000,
      spent: 5000,
      remaining: 5000,
    },
    {
      budget: 'Health',
      summarize: 'Health, doctor, dentist, pharmacy, gym',
      balance: 10000,
      spent: 5000,
      remaining: 5000,
    },
    {
      budget: 'Transportation',
      summarize: 'Transportation, car payment, gas, insurance, maintenance',
      balance: 10000,
      spent: 5000,
      remaining: 5000,
    },
    {
      budget: 'Services',
      summarize: 'Electricity, water, gas, phone, internet, subscriptions',
      balance: 10000,
      spent: 5000,
      remaining: 5000,
    },
    {
      budget: 'Other',
      summarize: 'Other, fees, taxes, hair, gift, savings, investments',
      balance: 10000,
      spent: 5000,
      remaining: 5000,
    },
  ];
  history = [
    {
      date: '2020-01-01',
      description: 'Home',
      type: 'expense',
      amount: 1000,
    },
    {
      date: '2020-01-01',
      description: 'Home',
      type: 'expense',
      amount: 1000,
    },
    {
      date: '2020-01-01',
      description: 'Home',
      type: 'income',
      amount: 1000,
    },
    {
      date: '2020-01-01',
      description: 'Home',
      type: 'income',
      amount: 1000,
    },
    {
      date: '2020-01-01',
      description: 'Home',
      type: 'expense',
      amount: 1000,
    },
    {
      date: '2020-01-01',
      description: 'Home',
      type: 'income',
      amount: 1000,
    },
  ];
}
