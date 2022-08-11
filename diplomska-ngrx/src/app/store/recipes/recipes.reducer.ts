import { Action, createReducer, on } from '@ngrx/store';
import { RecipeStore } from 'src/app/models/recipe-store.model';
import { Recipe } from 'src/app/models/recipe.model';
import * as RecipesActions from './recipes.actions';

const initialState: RecipeStore = {
  recipes: [],
  favoriteRecipes: [],
  speedTestObject: {
    id: 0,
    date: new Date(),
    text: '',
  },
};

export const recipesReducerFn = createReducer(
  initialState,
  on(RecipesActions.loadRecipesSuccess, (state, action) => {
    return {
      ...state,
      recipes: action.recipes,
    };
  }),
  on(RecipesActions.addToFavorites, (state, action) => {
    let newFavorites: Recipe[] = [...state.favoriteRecipes];
    newFavorites.push(action.recipe);
    return {
      ...state,
      favoriteRecipes: newFavorites,
    };
  }),
  on(RecipesActions.removeFromFavorites, (state, action) => {
    let newFavorites: Recipe[] = [...state.favoriteRecipes];
    let index = newFavorites.findIndex(
      (recipe) => recipe.id !== action.recipe.id
    );
    newFavorites.splice(index, 1);
    return {
      ...state,
      favoriteRecipes: newFavorites,
    };
  }),
  on(RecipesActions.selectRecipe, (state, action) => {
    return {
      ...state,
      selectedRecipe: action.recipe,
    };
  }),
  on(RecipesActions.speedTestAction, (state, action) => {
    return {
      ...state,
      speedTestObject: action.testObject,
    };
  })
);

export function recipesReducer(state = initialState, action: Action) {
  return recipesReducerFn(state, action);
}
