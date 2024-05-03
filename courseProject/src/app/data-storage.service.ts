import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { Recipe } from './recipes/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipeService) { }

  storeRecipies() {
    const recipes = this.recipesService.getRecipes();
    this.http.put("https://angular-course-ba273-default-rtdb.europe-west1.firebasedatabase.app/recipes.json", recipes)
      .subscribe(response => { console.log(response) });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>("https://angular-course-ba273-default-rtdb.europe-west1.firebasedatabase.app/recipes.json")
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          //initialize the ingredients if it returns as null from server
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }),
    tap(recipes=>{
      this.recipesService.setRecipes(recipes);
    }));
  }
}
