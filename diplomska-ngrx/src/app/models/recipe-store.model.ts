import { Recipe } from './recipe.model';

export interface RecipeStore {
  recipes: Recipe[];
  selectedRecipe?: Recipe;
  favoriteRecipes: Recipe[];
  speedTestObject: TestObj;
}

export interface TestObj {
  id: number;
  date: Date;
  text: string;
}
