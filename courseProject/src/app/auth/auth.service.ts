import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { User } from './user.model';

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

  constructor(private http: HttpClient) { }
  user = new Subject<User>();

  //sign up: https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  signUp(username: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp', {
      'email': username,
      'password': password,
      'returnSecureToken': true
    }, {
      params: { key: environment.firebaseApiKey }
    })
      .pipe(catchError(this.handleError), tap(this.signalUser));
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
      .pipe(catchError(this.handleError), tap(this.signalUser.bind(this)));
  }

  private signalUser(authR: AuthResponseData) {
    const tokenExpiresInMilliseconds = +authR.expiresIn * 1000;
    const expirationDate = new Date(new Date().getTime() + tokenExpiresInMilliseconds);
    this.user.next(new User(authR.email, authR.localId, authR.idToken, expirationDate));
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
  }
}
