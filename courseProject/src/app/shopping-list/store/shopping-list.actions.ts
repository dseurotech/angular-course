import { createAction, props } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";

export const addIngredient = createAction('[Shopping-List] Add ingredient', props<Ingredient>());
export const addIngredients = createAction('[Shopping-List] Add ingredients', props<{ newIngredients: Ingredient[] }>());
export const startEditIngredient = createAction('[Shopping-List] Start editing Ingredient', props<{ id: number }>());
export const stopEditIngredient = createAction('[Shopping-List] Stop editing Ingredient');
export const updateIngredient = createAction('[Shopping-List] Update Ingredient', props<Ingredient>());
export const deleteIngredient = createAction('[Shopping-List] Delete Ingredient');