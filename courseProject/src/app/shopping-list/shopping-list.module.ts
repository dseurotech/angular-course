import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule(
    {
        declarations: [
            ShoppingListComponent,
            ShoppingEditComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            ShoppingListRoutingModule
        ],
        exports: [
        ]
    }
)
export class ShoppingListModule { }