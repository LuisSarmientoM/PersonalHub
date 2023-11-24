import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Navbar } from '../models/ui/navbar.interface';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private _navbarState = new Subject<Navbar>();
  navbarState$ = this._navbarState.asObservable();
  navbar = new Navbar();
  constructor() {}

  toggleNavbar(state?: boolean) {
    this.navbar.toggleNavbarState(state);
  }

  getNavbarState() {
    return this.navbar.state;
  }
}
