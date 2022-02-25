import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Recipe } from '../../recipes/recipe.model';
import { environment } from '../../../environments/environment';
import { RecipeService } from '../../recipes/recipe.service';
import { exhaustMap, map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private recipesUrl = environment.apiUrl + 'recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http.put<{ name: string }>(this.recipesUrl, recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl)
      .pipe(
        map((recipes) => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        }));
  }
}
