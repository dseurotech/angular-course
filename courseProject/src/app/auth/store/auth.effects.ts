import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


import * as AuthActions from "./auth.actions";
import { AuthService } from "../auth.service";
import { environment } from "../../../environments/environment";
import { User } from "../user.model";
import { UserRepoService } from "../user-repo.service";
import { Router } from "@angular/router";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable()
export class AuthEffects {

    authSignup = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.signupStart),
            switchMap((authData) => {
                //sign up: https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
                return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp',
                    {
                        'email': authData.email,
                        'password': authData.password,
                        'returnSecureToken': true
                    },
                    {
                        params: { key: environment.firebaseApiKey }
                    }
                ).pipe(
                    tap((resData) => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                    map((resData) => {
                        return this.handleAuthentication(resData);
                    }),
                    catchError((errorRes) => {
                        return this.handleError(errorRes);
                    })
                );
            })
        ));
    authLogin = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginStart),
            switchMap((authData) => {
                //sign in: https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
                return this.http.post<AuthResponseData>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
                    {
                        'email': authData.email,
                        'password': authData.password,
                        'returnSecureToken': true
                    },
                    {
                        params: { key: environment.firebaseApiKey }
                    }
                ).pipe(
                    tap((resData) => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                    map((resData) => {
                        return this.handleAuthentication(resData);
                    }),
                    catchError((errorRes) => {
                        return this.handleError(errorRes);
                    })
                );
            })
        )
    );
    authRedirect = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.login),
                tap((authSuccessAction) => {
                    if (authSuccessAction.redirect) {
                        this.router.navigate(['/']);
                    }
                })
            ),
        { dispatch: false }
    );

    autoLogin = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.autoLogin),
            map(() => {
                const maybeUser = this.userRepo.fetchUser();
                if (!maybeUser) {
                    return { type: 'DUMMY' };
                }

                if (maybeUser.token) {
                    this.authService.setLogoutTimer(maybeUser.tokenValidForMillis);
                    return AuthActions.login({
                        user: maybeUser,
                        redirect: false
                    });
                }
                return { type: 'DO_NOTHING' };
            })
        )
    );

    authLogout = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logout),
                tap(() => {
                    this.authService.clearLogoutTimer();
                    this.userRepo.clear();
                    this.router.navigate(['/auth']);
                })
            ),
        { dispatch: false }
    );

    private handleAuthentication(authR: AuthResponseData) {
        const tokenExpiresInMilliseconds = +authR.expiresIn * 1000;
        const expirationDate = new Date(new Date().getTime() + tokenExpiresInMilliseconds);
        const user = new User(authR.email, authR.localId, authR.idToken, expirationDate)
        this.userRepo.storeUser(user);
        return AuthActions.login({ user: user, redirect: true });
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknown error occurred!";
        if (!errorRes.error || !errorRes.error.error || !errorRes.error.error.message) {
            return of(AuthActions.loginFail({ error: errorMessage }));
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
        return of(AuthActions.loginFail({ error: errorMessage }));
    };

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private userRepo: UserRepoService,
        private authService: AuthService,
    ) { }
}

