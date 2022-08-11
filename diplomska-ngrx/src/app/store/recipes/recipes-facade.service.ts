import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RecipeStore, TestObj } from 'src/app/models/recipe-store.model';
import { Recipe } from 'src/app/models/recipe.model';
import * as RecipesActions from './recipes.actions';
import * as RecipesSelectors from './recipes.selectors';

@Injectable()
export class RecipesFacadeService {
  public recipes$ = this.store.pipe(select(RecipesSelectors.selectRecipes));
  public selectedRecipe$ = this.store.pipe(
    select(RecipesSelectors.selectSelectedRecipe)
  );
  public favoriteRecipes$ = this.store.pipe(
    select(RecipesSelectors.selectFavoriteRecipes)
  );
  public speedTestObject$ = this.store.pipe(
    select(RecipesSelectors.selectSpeedTestObject)
  );
  constructor(private store: Store<RecipeStore>) {}

  loadRecipes() {
    this.store.dispatch(RecipesActions.loadRecipes());
  }

  selectRecipe(recipe: Recipe) {
    this.store.dispatch(RecipesActions.selectRecipe({ recipe }));
  }

  addToFavorites(recipe: Recipe) {
    this.store.dispatch(RecipesActions.addToFavorites({ recipe }));
  }

  removeFromFavorites(recipe: Recipe) {
    this.store.dispatch(RecipesActions.removeFromFavorites({ recipe }));
  }

  addSpeedObjectToStore(testObject: TestObj) {
    this.store.dispatch(RecipesActions.speedTestAction({ testObject }));
  }
}
