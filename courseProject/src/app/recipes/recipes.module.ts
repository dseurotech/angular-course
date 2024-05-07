import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { SelectRecipeComponent } from "./select-recipe/select-recipe.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule(
    {
        declarations: [
            RecipesComponent,
            RecipeListComponent,
            RecipeDetailComponent,
            RecipeItemComponent,
            SelectRecipeComponent,
            RecipeEditComponent,
        ],
        imports: [
            CommonModule,
            FormsModule,
            RouterModule,
            ReactiveFormsModule
        ],
        exports: [
            RecipesComponent,
            RecipeListComponent,
            RecipeDetailComponent,
            RecipeItemComponent,
            SelectRecipeComponent,
            RecipeEditComponent,
        ]
    }
)
export class RecipesModule { }