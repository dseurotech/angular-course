import { createAction, props } from "@ngrx/store";
import { User } from "../user.model";

export const login = createAction("[Auth] login", props<User>())
export const logout = createAction("[Auth] logout")