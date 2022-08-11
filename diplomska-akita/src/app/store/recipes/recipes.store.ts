import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Recipe } from 'src/app/models/recipe.model';

export interface RecipesState {
  recipes: Recipe[];
  selectedRecipe: Recipe;
  favoriteRecipes: Recipe[];
  speedTestObject: TestObj;
}

export interface TestObj {
  id: number;
  date: Date;
  text: string;
}

export function createInitialState(): RecipesState {
  return {
    recipes: [],
    selectedRecipe: {
      id: 0,
      image: '',
      ingredients: [],
      instructions: [],
      times: [],
      title: '',
    },
    favoriteRecipes: [],
    speedTestObject: {
      id: 0,
      date: new Date(),
      text: '',
    },
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'recipes' })
export class RecipesStore extends Store<RecipesState> {
  constructor() {
    super(createInitialState());
  }
}
