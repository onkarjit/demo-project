import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from "../shared/models/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription } from "rxjs";
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangedSub: Subscription;

  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangedSub = this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }z

  ngOnDestroy() {
    this.igChangedSub.unsubscribe();
  }
}
