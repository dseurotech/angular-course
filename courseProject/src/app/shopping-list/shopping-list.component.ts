import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  sub: Subscription;
  constructor(private shoppingListService: ShoppingListService) {
  }
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.sub = this.shoppingListService.ingredientsChanged.subscribe((newIngredients: Ingredient[]) => this.ingredients = newIngredients);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }
}
