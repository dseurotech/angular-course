import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { addIngredient, deleteIngredient, stopEditIngredient, updateIngredient } from '../store/shopping-list.actions';
import { AppState } from "../../app.module";
import { editedIngredient } from '../store/shopping-list.selectors';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;
  private sub: Subscription;
  editMode: boolean = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.sub = this.store.select(editedIngredient)
      .subscribe(stateData => {
        if (stateData.idx < 0) {
          this.editMode = false;
          return;
        }
        this.editMode = true;
        this.form.setValue({
          name: stateData.ingredient.name,
          amount: stateData.ingredient.amount
        });
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.store.dispatch(stopEditIngredient());
  }

  onUpsertIngredient(form: NgForm) {
    const value = form.value;
    const newData = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(updateIngredient(newData));
    } else {
      this.store.dispatch(addIngredient(newData));
    }
    this.onClear();
  }

  onRemoveIngredient() {
    this.store.dispatch(deleteIngredient());
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.form.reset();
    this.store.dispatch(stopEditIngredient());
  }
}
