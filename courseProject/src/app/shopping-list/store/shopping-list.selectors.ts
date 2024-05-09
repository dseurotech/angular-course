import { createSelector } from "@ngrx/store";
import { AppState } from "../../store/app.reducer";

export const shoppingList = (state: AppState) => state.shoppingList;
export const ingredients = createSelector(
    shoppingList,
    a => a.ingredients
);
export const editedIngredient = createSelector(
    shoppingList,
    state => { return { ingredient: state.editedIngredient, idx: state.editedIngredientIndex } }
);