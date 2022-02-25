import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { RecipeService } from "../recipe.service";
import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/models/ingredient.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  get igFormArray(): FormArray {
    return (<FormArray>this.recipeForm.get('ingredients'));
  }


  onSubmit() {
    // const value = this.recipeForm.value;
    // const newRecipe = new Recipe(value.name, value.description, value.imageUrl, value.ingredients);

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.router.navigate(['../'], { relativeTo: this.route })
    } else {
      const addedRecipeIndex = this.recipeService.addRecipe(this.recipeForm.value);
      this.router.navigate(['../', addedRecipeIndex], { relativeTo: this.route })
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onAddIngredient() {
    this.igFormArray.push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$')
      ])
    }));
  }




  private initForm() {
    let recipe: Recipe;
    let recipeIngredients = new FormArray([])

    if (this.editMode) {
      recipe = this.recipeService.getRecipe(this.id);
      if (recipe.ingredients) {
        recipe.ingredients.forEach((ingredient: Ingredient) => {
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        })
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipe?.name, Validators.required),
      imageUrl: new FormControl(recipe?.imageUrl, Validators.required),
      description: new FormControl(recipe?.description, Validators.required),
      ingredients: recipeIngredients
    });
  }


  onDeleteIngredient(index: number) {
    this.igFormArray.removeAt(index);
  }
}
