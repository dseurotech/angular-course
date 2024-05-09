import { createReducer, on } from "@ngrx/store";
import { addIngredient, addIngredients, deleteIngredient, startEditIngredient, stopEditIngredient, updateIngredient } from "./shopping-list.actions";
import { Ingredient } from "../../shared/ingredient.model";

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}
const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export const shoppingListReducer = createReducer(
    initialState,
    on(addIngredient,
        (state, newIngredient) => {
            return {
                ...state,
                ingredients: [...state.ingredients, newIngredient]
            }
        }
    ),
    on(addIngredients,
        (state, action) => {
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.newIngredients]
            }
        }
    ),
    on(
        startEditIngredient,
        (state, action) => {
            return {
                ...state,
                editedIngredientIndex: action.id,
                editedIngredient: { ...state.ingredients[action.id] }
            };
        }
    ),
    on(
        stopEditIngredient,
        (state, action) => {
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        }
    ),
    on(
        updateIngredient,
        (state, newIngredient) => {
            const newIngredients = state.ingredients.slice();
            newIngredients[state.editedIngredientIndex] = newIngredient;
            return {
                ...state,
                ingredients: newIngredients
            };
        }
    ),
    on(
        deleteIngredient,
        (state, action) => {
            const newIngredients = state.ingredients.slice();
            newIngredients.splice(state.editedIngredientIndex, 1);
            return {
                ...state,
                ingredients: newIngredients
            };
        }
    )
);