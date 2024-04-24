import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe("Dummy Recipe", "Dummy description", "https://storage.needpix.com/rsynced_images/recipe-575434_1280.png", [new Ingredient("Bread", 5), new Ingredient("Egg", 1)]),
    new Recipe("Dummy Recipe2", "Dummy descr2iption", "https://storage.needpix.com/rsynced_images/recipe-575434_1280.png", [new Ingredient("Flur", 1), new Ingredient("Sugar", 2)]),
    new Recipe("Dummy Recipe3", "Dummy descr2iption", "https://storage.needpix.com/rsynced_images/recipe-575434_1280.png", [new Ingredient("Raisin", 2), new Ingredient("Seeds", 7)]),
    new Recipe("Dummy Recipe4", "Dummy descr2iption", "https://storage.needpix.com/rsynced_images/recipe-575434_1280.png", [new Ingredient("Meat", 4), new Ingredient("Milk", 1)]),
    new Recipe("Dummy Recipe5", "Dummy descr2iption", "https://storage.needpix.com/rsynced_images/recipe-575434_1280.png", [new Ingredient("Coffee", 9), new Ingredient("Cheese", 3)])
  ];

  currentRecipe: Recipe;

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

  getById(index: number) {
    return this.recipes[index];
  }
}
