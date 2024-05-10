import { createAction, props } from "@ngrx/store";
import { User } from "../user.model";

export const loginStart = createAction("[Auth] login start", props<{ email: string, password: string }>());
export const login = createAction("[Auth] login", props<{ user: User, redirect: boolean }>());
export const loginFail = createAction(
    '[Auth] Login Fail',
    props<{ error: string }>()
);
export const logout = createAction("[Auth] logout");

export const signupStart = createAction(
    '[Auth] Signup Start',
    props<{ email: string; password: string }>()
);

export const clearError = createAction('[Auth] Clear Error');

export const autoLogin = createAction('[Auth] Auto Login');