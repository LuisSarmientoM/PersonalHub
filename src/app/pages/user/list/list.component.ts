import { Component } from '@angular/core';
import { ListViewComponent } from '@shared/components/list/list-view.component';
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ListViewComponent, CardComponent],
  templateUrl: './list.component.html',
})
export default class UserListComponent {
  users = [
    'Luis',
    'Juan',
    'Pedro',
    'Maria',
    'Jose',
    'Carlos',
    'Andres',
    'Aura',
    'Cristian',
    'Carlos',
    'Andres',
    'Aura',
    'Cristian',
  ];
}
