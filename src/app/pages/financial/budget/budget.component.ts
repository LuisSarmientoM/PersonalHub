import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TooltipDirective } from 'tooltip';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, TooltipDirective],
  templateUrl: './budget.component.html',
  styles: ``,
})
export default class BudgetComponent {
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
}
