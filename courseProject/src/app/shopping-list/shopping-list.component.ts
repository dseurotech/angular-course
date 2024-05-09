import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { startEditIngredient } from './store/shopping-list.actions';
import { ingredients } from './store/shopping-list.selectors';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<any>

  constructor(
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    this.ingredients = this.store.select(ingredients);
  }

  onEditItem(id: number) {
    this.store.dispatch(startEditIngredient({ id: id }));
  }
}
