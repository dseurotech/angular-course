import { createReducer, on } from "@ngrx/store";
import { User } from "../user.model";
import { login, logout } from "./auth.actions";
import { Action } from "rxjs/internal/scheduler/Action";

export interface State {
    currentUser: User
}
const initialState: State = {
    currentUser: null
};

export const authReducer = createReducer(
    initialState,
    on(login, (state, action) => {
        return {
            ...state,
            currentUser: action
        };
    }),
    on(logout, (state) => {
        return {
            ...state,
            currentUser: null
        };
    })
);