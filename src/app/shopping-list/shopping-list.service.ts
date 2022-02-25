import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Ingredient } from "../shared/models/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients.slice()[index];
  }

  addIngredient(ingredient: Ingredient) {
    let matchedIngredientIndex = this.ingredients.findIndex((ig: Ingredient) => ig.name === ingredient.name);
    if (matchedIngredientIndex > -1) {
      this.ingredients[matchedIngredientIndex].amount += ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
