import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeStore } from 'src/app/models/recipe-store.model';

const selectRecipesState = createFeatureSelector<RecipeStore>('recipes');

export const selectRecipes = createSelector(
  selectRecipesState,
  (state) => state.recipes
);

export const selectFavoriteRecipes = createSelector(
  selectRecipesState,
  (state) => state.favoriteRecipes
);

export const selectSelectedRecipe = createSelector(
  selectRecipesState,
  (state) => state.selectedRecipe
);

export const selectSpeedTestObject = createSelector(
  selectRecipesState,
  (state) => state.speedTestObject
);
