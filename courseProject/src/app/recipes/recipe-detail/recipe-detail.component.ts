import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = null;

  constructor(private recipeService: RecipeService) { }
  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((selected: Recipe) => {
      return this.recipe = selected;
    });
  }
}
