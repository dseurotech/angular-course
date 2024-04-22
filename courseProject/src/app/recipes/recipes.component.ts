import { Component } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  currentRecipe: Recipe;
  onRecipeSelected(recipe: Recipe) {
    this.currentRecipe = recipe;
  }
}
