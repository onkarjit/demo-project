import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Ingredient } from "../../shared/models/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('shoppingListForm') shoppingListForm: NgForm;
  editedItemIndex: number;
  editedItem: Ingredient;
  editMode = false;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editedItemIndex = +params['id'];
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.editedItem = this.shoppingListService.getIngredient(this.editedItemIndex);
        setTimeout(() => {
          this.shoppingListForm.setValue({name: this.editedItem.name, amount: this.editedItem.amount});
        });
      }
    });
  }


  onSubmit() {
    const value = this.shoppingListForm.value;
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, new Ingredient(value['name'], value['amount']));
      this.onClear();
    } else {
      this.shoppingListService.addIngredient(new Ingredient(value['name'], value['amount']));
    }
  }

  onClear() {
    if (this.editMode) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.shoppingListForm.reset();
    }
  }

  onDelete() {
    if (this.editMode) {
      const value = this.shoppingListForm.value;
      this.shoppingListService.deleteIngredient(this.editedItemIndex, new Ingredient(value['name'], value['amount']));
      this.onClear();
    }
  }
}
