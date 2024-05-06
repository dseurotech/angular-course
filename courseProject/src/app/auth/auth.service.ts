import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { UserRepoService } from './user-repo.service';

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userRepo: UserRepoService, private http: HttpClient, private router: Router) { }
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  //sign up: https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  signUp(username: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp', {
      'email': username,
      'password': password,
      'returnSecureToken': true
    }, {
      params: { key: environment.firebaseApiKey }
    })
      .pipe(catchError(this.handleError), tap(this.handleAuthentication));
  }

  //sign in: https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  login(username: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword', {
      'email': username,
      'password': password,
      'returnSecureToken': true
    }, {
      params: { key: environment.firebaseApiKey }
    })
      .pipe(catchError(this.handleError), tap(this.handleAuthentication.bind(this)));
  }

  autoLogin() {
    const maybeUser = this.userRepo.fetchUser();
    this.user.next(maybeUser);
    if (maybeUser) {
      this.autoLogout(maybeUser.tokenValidForMillis);
    }
  }

  autoLogout(expirationDurationMillis: number) {
    console.log(expirationDurationMillis);
    this.tokenExpirationTimer = setTimeout(this.logout.bind(this), expirationDurationMillis);
  }

  private handleAuthentication(authR: AuthResponseData) {
    const tokenExpiresInMilliseconds = +authR.expiresIn * 1000;
    const expirationDate = new Date(new Date().getTime() + tokenExpiresInMilliseconds);
    const user = new User(authR.email, authR.localId, authR.idToken, expirationDate)
    this.user.next(user);
    this.userRepo.storeUser(user);
    this.autoLogout(tokenExpiresInMilliseconds);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error || !errorRes.error.error.message) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.error.message) {
      //signUp errors
      case "EMAIL_EXISTS":
        errorMessage = "This email already exists!";
        break;
      //signIn errors
      case "INVALID_LOGIN_CREDENTIALS":
      case "EMAIL_NOT_FOUND":
      case "INVALID_PASSWORD":
        errorMessage = "Invalid login credentials";
        break;
      case "USER_DISABLED":
        errorMessage = "User disabled";
        break;
    }
    return throwError(() => errorMessage);
  };

  logout() {
    this.user.next(null);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
    localStorage.removeItem('usr');
    this.router.navigate(["/auth"]);
  }
}
