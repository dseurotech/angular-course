import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {


  id: number;
  editMode: boolean;
  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = !!params['id'];
      if (this.editMode) {
        const recipe = this.recipeService.getById(this.id);
        this.initForm(recipe);
      } else {
        this.initForm(null);
      }
    })
  }

  private initForm(recipe: Recipe) {
    let ingredients = (!recipe || !recipe.ingredients) ? [] : recipe.ingredients.map(this.mapIngredientToControls);
    console.log(ingredients);
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe?.name, Validators.required),
      'imagePath': new FormControl(recipe?.imagePath, Validators.required),
      'description': new FormControl(recipe?.description, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  addNewIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.mapIngredientToControls(null));
  }

  mapIngredientToControls(i: Ingredient): FormGroup {
    return new FormGroup({
      name: new FormControl(i?.name, Validators.required),
      amount: new FormControl(i?.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
  }

  onSubmit() {
    // const formValues = this.recipeForm.value;
    // const newRecipe: Recipe = new Recipe(formValues.name, formValues.description, formValues.imageUrl, formValues.ingredients);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
