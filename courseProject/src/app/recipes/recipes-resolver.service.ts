import { Injectable } from '@angular/core';
import { DataStorageService } from '../data-storage.service';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Recipe[]> {
    return this.dataStorageService.fetchRecipes();
  }

}
