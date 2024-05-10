import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable, Subscription, map, take } from 'rxjs';
import { Router } from '@angular/router';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.selectors';
import * as AuthActions from '../auth/store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  storeSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSubscription = this.store.select(fromAuth.authState).subscribe(
      authState => {
        this.isLoading = authState.loading;
        this.error = authState.error;
      });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    if (this.isLoginMode) {
      this.store.dispatch(AuthActions.loginStart({ email: email, password: password }));
    } else {
      this.store.dispatch(AuthActions.signupStart({ email: email, password: password }));
    }
    // authForm.reset();
  }

  onCloseError() {
    this.store.dispatch(AuthActions.clearError());
  }
}
