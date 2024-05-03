import { Injectable } from '@angular/core';
import { DataStorageService } from '../data-storage.service';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Recipe[]> {
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0) {∏
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
