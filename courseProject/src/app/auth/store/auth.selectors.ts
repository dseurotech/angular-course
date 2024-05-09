import { createSelector } from "@ngrx/store";
import { AppState } from "../../store/app.reducer";

export const auth = (state: AppState) => state.auth;
export const currentUser = createSelector(
    auth,
    a => a.currentUser
);