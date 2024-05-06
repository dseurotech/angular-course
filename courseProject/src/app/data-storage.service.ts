import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { Recipe } from './recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { environment } from './../environments/environment';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipeService, private authSvc: AuthService) {
  }

  storeRecipies() {
    const recipes = this.recipesService.getRecipes();
    
    this.http.put(environment.firebaseDbUrl + "/recipes.json", recipes)
      .subscribe(response => { console.log(response) });
  }

  fetchRecipes() {
    return this.authSvc.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(environment.firebaseDbUrl + "/recipes.json", {
          params: new HttpParams().set("auth", user.token)
        });
      }),
      map(recipes => {
        return recipes.map(recipe => {
          //initialize the ingredients if it returns as null from server
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }),
      tap(recipes => {
        this.recipesService.setRecipes(recipes);
      })
    );
  }
}
