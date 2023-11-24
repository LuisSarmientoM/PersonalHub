import { Observable, Subject } from 'rxjs';

export class Navbar {
  private isOpen = false;
  state: Observable<boolean>;
  private _state = new Subject<boolean>();
  constructor() {
    this.state = this._state.asObservable();
  }

  toggleNavbarState(state?: boolean) {
    this.isOpen = state ?? !this.isOpen;
    this._state.next(this.isOpen);
  }
}
