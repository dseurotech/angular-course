import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  //sign up: https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  //sign in: https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  signUp(username: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp', {
      'email': username,
      'password': password,
      'returnSecureToken': true
    }, {
      params: { key: environment.firebaseApiKey }
    })
      .pipe(catchError(errorRes => {
        let errorMessage = "An unknown error occurred!";
        if (!errorRes.error || !errorRes.error.error || !errorRes.error.error.message) {
          return throwError(() => errorMessage);
        }
        switch (errorRes.error.error.message) {
          case "EMAIL_EXISTS":
            errorMessage = "This email already exists!";
        }
        return throwError(() => errorMessage);
      }));
  }
  login(username: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword', {
      'email': username,
      'password': password,
      'returnSecureToken': true
    }, {
      params: { key: environment.firebaseApiKey }
    })
      .pipe(catchError(errorRes => {
        let errorMessage = "An unknown error occurred!";
        if (!errorRes.error || !errorRes.error.error || !errorRes.error.error.message) {
          return throwError(() => errorMessage);
        }
        switch (errorRes.error.error.message) {
          case "INVALID_LOGIN_CREDENTIALS":
            errorMessage = "Invalid login credentials";
          case "EMAIL_NOT_FOUND":
            errorMessage = "Unkown user";
          case "INVALID_PASSWORD":
            errorMessage = "Wrong password";
          case "USER_DISABLED":
            errorMessage = "User disabled";
        }
        return throwError(() => errorMessage);
      }));
  }
}
