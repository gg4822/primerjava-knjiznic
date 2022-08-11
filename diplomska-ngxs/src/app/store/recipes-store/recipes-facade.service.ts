import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import * as RecipesActions from './recipes.state';
import { TestObj } from './recipes.state';
@Injectable({
  providedIn: 'root',
})
export class RecipesFacadeService {
  public recipes$: Observable<Recipe[]>;
  public selectedRecipe$: Observable<Recipe>;
  public favoriteRecipes$: Observable<Recipe[]>;
  public speedTestObject$: Observable<TestObj>;

  constructor(private store: Store) {
    this.recipes$ = this.store.select((state) => state.recipes.recipes);
    this.selectedRecipe$ = this.store.select(
      (state) => state.recipes.selectedRecipe
    );
    this.favoriteRecipes$ = this.store.select(
      (state) => state.recipes.favoriteRecipes
    );
    this.speedTestObject$ = this.store.select(
      (state) => state.recipes.speedTestObject
    );
  }

  loadRecipes() {
    this.store.dispatch(new RecipesActions.LoadRecipes());
  }

  selectRecipe(recipe: Recipe) {
    this.store.dispatch(new RecipesActions.SelectRecipe(recipe));
  }

  addToFavorites(recipe: Recipe) {
    this.store.dispatch(new RecipesActions.AddToFavorites(recipe));
  }

  removeFromFavorites(recipe: Recipe) {
    this.store.dispatch(new RecipesActions.RemoveFromFavorites(recipe));
  }

  addSpeedObjectToStore(testObject: TestObj) {
    this.store.dispatch(new RecipesActions.SpeedTestAction(testObject));
  }
}
