import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";

import { Observable, exhaustMap, take } from "rxjs";

import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.selectors';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private store: Store<fromApp.AppState>
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.store.select(fromAuth.currentUser).pipe(
            take(1),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                const modifiedRequest = req.clone({ params: new HttpParams().set("auth", user.token) });
                return next.handle(modifiedRequest);
            })
        );
    }
}