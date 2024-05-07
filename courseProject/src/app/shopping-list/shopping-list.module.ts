import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { SharedModule } from "../shared/shared.module";

@NgModule(
    {
        declarations: [
            ShoppingListComponent,
            ShoppingEditComponent
        ],
        imports: [
            SharedModule,
            FormsModule,
            ShoppingListRoutingModule
        ],
        exports: [
        ]
    }
)
export class ShoppingListModule { }