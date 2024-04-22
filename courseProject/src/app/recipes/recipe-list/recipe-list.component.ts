import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe("Dummy Recipe", "Dummy description", "https://storage.needpix.com/rsynced_images/recipe-575434_1280.png"),
    new Recipe("Dummy Recipe2", "Dummy descr2iption", "https://storage.needpix.com/rsynced_images/recipe-575434_1280.png"),
    new Recipe("Dummy Recipe3", "Dummy descr2iption", "https://storage.needpix.com/rsynced_images/recipe-575434_1280.png"),
    new Recipe("Dummy Recipe4", "Dummy descr2iption", "https://storage.needpix.com/rsynced_images/recipe-575434_1280.png"),
    new Recipe("Dummy Recipe5", "Dummy descr2iption", "https://storage.needpix.com/rsynced_images/recipe-575434_1280.png")
  ];

  onRecipeSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}
