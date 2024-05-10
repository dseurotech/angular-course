import { createReducer, on } from "@ngrx/store";
import { User } from "../user.model";
import * as AuthActions from './auth.actions';
import { Action } from "rxjs/internal/scheduler/Action";

export interface State {
    currentUser: User;
    authError: string;
    loading: boolean;
}
const initialState: State = {
    currentUser: null,
    authError: null,
    loading: false,
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.loginStart, state => {
        return {
            ...state,
            authError: null,
            loading: true,
        };
    }),
    on(AuthActions.signupStart, state => {
        return {
            ...state,
            authError: null,
            loading: true,
        };
    }),
    on(AuthActions.login, (state, action) => {
        return {
            ...state,
            currentUser: action.user,
            authError: null,
            loading: false
        };
    }),
    on(AuthActions.loginFail, (state, action) => {
        return {
            ...state,
            user: null,
            authError: action.error,
            loading: false,
        };
    }),
    on(AuthActions.logout, (state) => {
        return {
            ...state,
            currentUser: null
        };
    }),


    on(AuthActions.clearError, (state) => {
        return {
            ...state,
            authError: null,
        };
    })
);