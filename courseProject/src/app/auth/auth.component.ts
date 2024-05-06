import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.isLoading = true;
    this.error = null;
    let httpCallOutcome: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      httpCallOutcome = this.authService.login(email, password);
    } else {
      httpCallOutcome = this.authService.signUp(email, password);
    }

    httpCallOutcome
      .subscribe({
        next: authData => {
          this.isLoading = false;
          console.log(authData);
          this.router.navigate(['/recipes']);
        },
        error: errorMessage => {
          this.isLoading = false;
          this.error = errorMessage;
        }
      });
    // authForm.reset();
  }
}
