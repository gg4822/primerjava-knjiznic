import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { RecipesState, RecipesStore } from './recipes.store';

@Injectable({
  providedIn: 'root',
})
export class RecipesQuery extends Query<RecipesState> {
  recipes$ = this.select((state) => state.recipes);
  selectedRecipe$ = this.select((state) => state.selectedRecipe);
  favoriteRecipes$ = this.select((state) => state.favoriteRecipes);
  speedTestObject$ = this.select((state) => state.speedTestObject);

  constructor(protected store: RecipesStore) {
    super(store);
  }
}
