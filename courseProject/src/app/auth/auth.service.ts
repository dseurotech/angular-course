import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  //sign up: https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
//sign in: https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  signUp(username: string, password: string) {
    this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp')

  }
}
