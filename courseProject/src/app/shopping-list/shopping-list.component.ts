import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from "../app.module";
import { startEditIngredient } from './store/shopping-list.actions';
import { State } from './store/shopping-list.reducer';
import { ingredients, shoppingList } from './store/shopping-list.selectors';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<any>

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.ingredients = this.store.select(ingredients);
  }

  onEditItem(id: number) {
    this.store.dispatch(startEditIngredient({ id: id }));
  }
}
