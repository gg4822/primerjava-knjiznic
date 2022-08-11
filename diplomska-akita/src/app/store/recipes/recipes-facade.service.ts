import { Injectable } from '@angular/core';
import { arrayAdd, arrayRemove } from '@datorama/akita';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesApiService } from './recipes-api.service';
import { RecipesQuery } from './recipes.query';
import { RecipesStore, TestObj } from './recipes.store';

@Injectable({
  providedIn: 'root',
})
export class RecipesFacadeService {
  recipes$ = this.recipesQuery.recipes$;
  selectedRecipe$ = this.recipesQuery.selectedRecipe$;
  favoriteRecipes$ = this.recipesQuery.favoriteRecipes$;
  speedTestObject$ = this.recipesQuery.speedTestObject$;

  constructor(
    private recipesStore: RecipesStore,
    private recipesApiService: RecipesApiService,
    private recipesQuery: RecipesQuery
  ) {}

  loadRecipes() {
    this.recipesApiService.getNRandomRecipes(15).subscribe((recipes) => {
      this.recipesStore.update({ recipes: recipes });
    });
  }

  selectRecipe(recipe: Recipe) {
    this.recipesStore.update({ selectedRecipe: recipe });
  }

  addToFavorites(recipe: Recipe) {
    this.recipesStore.update(({ favoriteRecipes }) => ({
      favoriteRecipes: arrayAdd(favoriteRecipes, recipe),
    }));
  }

  removeFromFavorites(recipe: Recipe) {
    this.recipesStore.update(({ favoriteRecipes }) => ({
      favoriteRecipes: arrayRemove(favoriteRecipes, recipe.id),
    }));
  }

  addSpeedObjectToStore(testObject: TestObj) {
    this.recipesStore.update({ speedTestObject: testObject });
  }
}
