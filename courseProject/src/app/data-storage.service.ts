import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { Recipe } from './recipes/recipe.model';

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
      .subscribe(recipes => {
        this.recipesService.setRecipes(recipes);
      })
  }
}
