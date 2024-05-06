import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserRepoService {

  constructor() { }
  readonly USER_KEY: string = 'usr';

  storeUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  fetchUser(): User {
    const userFromStorage = localStorage.getItem('usr');
    if (!userFromStorage) {
      return null;
    }
    const parsedUser: User = Object.assign(new User(null, null, null, null), JSON.parse(userFromStorage, function (key, value) {
      if (key !== '_tokenExpirationDate') {
        return value;
      }
      return new Date(value);
    }));
    if (!parsedUser.token) {
      localStorage.removeItem(this.USER_KEY);
      return null;
    }
    return parsedUser;
  }
}
