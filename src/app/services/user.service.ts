import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/user.interface';
import { Database, get, getDatabase, ref, set } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<IUser>;
  private usersSubject = new BehaviorSubject<IUser[]>([]);

  public currentUser: Observable<IUser>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<IUser>({} as IUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Set user value.
   * @param user IUser    User object.
   */
  public set User(user: IUser) {
    this.currentUserSubject.next(user);
  }

  /**
   * Get current user value.
   * @return User   Connected User object value.
   */
  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  /**
   * Get user from realtime database.
   * @param uid string    User uid.
   * @return Observable<IUser>   User object.
   */
  public async getUser(uid: string) {
    const dbRef = ref(getDatabase(), `users/${uid}`);

    await get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        const user = snapshot.val();
        this.User = {
          email: user.email,
          name: user.name,
          uid,
          acl: user.acl,
        };
      }
    });
  }

  public getUsers() {
    const dbRef = ref(getDatabase(), `users/`);

    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        const snapshotUsers = snapshot.val();
        const users: IUser[] = [];
        for (const key in snapshotUsers) {
          if (Object.prototype.hasOwnProperty.call(snapshotUsers, key)) {
            const user = snapshotUsers[key];
            users.push({
              email: user.email,
              name: user.name,
              uid: key,
              acl: user.acl,
            });
          }
        }
        this.usersSubject.next([...this.usersSubject.value, ...users]);
      }
    });
    return this.usersSubject;
  }

  public async createUser(data: any) {
    const dbRef = ref(getDatabase(), `usersa`);

    await set(dbRef, [
      {
        email: 'data.email',
        name: 'data.name',
        acl: 'data.acl',
      },
      {
        email: 'data.email',
        name: 'data.name',
        acl: 'data.acl',
      },
      {
        email: 'data.email',
        name: 'data.name',
        acl: 'data.acl',
      },
    ]).then((snapshot) => {});
  }
}
