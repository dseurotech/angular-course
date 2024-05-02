import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;
  private sub: Subscription;
  editMode: boolean = false;
  private editedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.sub = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      const editedItem = this.shoppingListService.getIngredient(index);
      this.form.setValue({
        name: editedItem.name,
        amount: editedItem.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onUpsertIngredient(form: NgForm) {
    const value = form.value;
    const newData = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newData);
    } else {
      this.shoppingListService.addIngredient(newData);
    }
    this.onClear();
  }
  onRemoveIngredient() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  onClear() {
    this.editMode = false;
    this.editedItemIndex = null;
    this.form.reset();
  }
}
