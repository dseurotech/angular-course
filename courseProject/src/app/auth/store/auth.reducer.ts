import { createReducer } from "@ngrx/store";
import { User } from "../user.model";

export interface State {
    currentUser: User
}
const initialState: State = {
    currentUser: null
};

export const authReducer = createReducer(
    initialState
);