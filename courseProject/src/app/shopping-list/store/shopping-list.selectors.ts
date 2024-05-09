import { createSelector } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import { pipe } from "rxjs";
import { State } from "./shopping-list.reducer";
import { AppState } from "../../app.module";

export const shoppingList = (state: AppState) => state.shoppingList;
export const ingredients = createSelector(
    shoppingList,
    a => a.ingredients
);
export const editedIngredient = createSelector(
    shoppingList,
    state => { return { ingredient: state.editedIngredient, idx: state.editedIngredientIndex } }
);