import { createAction, props } from '@ngrx/store';
import { TestObj } from 'src/app/models/recipe-store.model';
import { Recipe } from 'src/app/models/recipe.model';

export const loadRecipes = createAction('[Recipes] Load Recipes');
export const loadRecipesSuccess = createAction(
  '[Recipes] Load Recipes SUCCESS',
  props<{ recipes: Recipe[] }>()
);
export const loadRecipesFail = createAction('[Recipes] Load Recipes FAIL');

export const addToFavorites = createAction(
  '[Recipes] Add to favorites',
  props<{ recipe: Recipe }>()
);
export const removeFromFavorites = createAction(
  '[Recipes] Remove from favorites',
  props<{ recipe: Recipe }>()
);

export const selectRecipe = createAction(
  '[Recipe] Select recipe',
  props<{ recipe: Recipe }>()
);

export const speedTestAction = createAction(
  '[Test] Speed test',
  props<{ testObject: TestObj }>()
);
