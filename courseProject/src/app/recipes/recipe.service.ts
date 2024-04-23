import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe("Dummy Recipe", "Dummy description", "https://storage.needpix.com/rsynced_images/recipe-575434_1280.png"),
    new Recipe("Dummy Recipe2", "Dummy descr2iption", "https://storage.needpix.com/rsynced_images/recipe-575434_1280.png"),
    new Recipe("Dummy Recipe3", "Dummy descr2iption", "https://storage.needpix.com/rsynced_images/recipe-575434_1280.png"),
    new Recipe("Dummy Recipe4", "Dummy descr2iption", "https://storage.needpix.com/rsynced_images/recipe-575434_1280.png"),
    new Recipe("Dummy Recipe5", "Dummy descr2iption", "https://storage.needpix.com/rsynced_images/recipe-575434_1280.png")
  ];

  currentRecipe: Recipe;

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
