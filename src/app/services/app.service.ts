import { Injectable, inject } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { get, getDatabase, ref } from '@angular/fire/database';
import { Subject } from 'rxjs';
import { Acl } from '../models/user.interface';

type empty = (resolve: any) => void;
@Injectable({
  providedIn: 'root',
})
export class AppService {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private aclSubject = new Subject<Acl>();

  acl$ = this.aclSubject.asObservable();

  load(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getUser(resolve);
    });
  }

  getUser(resolve: empty) {
    this.authService.userState.subscribe(async (user) => {
      if (user) {
        await this.userService.getUser(user.uid);
        resolve(true);
      }
      resolve(false);
    });
  }

  getACL() {
    const dbRef = ref(getDatabase(), `acl`);
    get(dbRef).then((snapshot) => {
      if (!snapshot.exists()) {
        return;
      }
      this.aclSubject.next(snapshot.val());
    });
    return this.acl$;
  }
}
