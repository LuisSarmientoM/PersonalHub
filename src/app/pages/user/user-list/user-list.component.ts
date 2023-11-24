import { Component, OnInit, inject } from '@angular/core';
import { ListViewComponent } from '@shared/components/list/list-view.component';
import { CardComponent } from '../components/card/card.component';
import { UserService } from '@services/user.service';
import { Dialog } from '@angular/cdk/dialog';
import { FormComponent } from '../components/form/form.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ListViewComponent, CardComponent, RouterLink],
  templateUrl: './user-list.component.html',
})
export default class UserListComponent implements OnInit {
  public users: any[] = [];
  load = false;
  userService = inject(UserService);
  dialog = inject(Dialog);
  ngOnInit(): void {
    this.getUsers();
  }
  async getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.load = true;
    });
  }
}
