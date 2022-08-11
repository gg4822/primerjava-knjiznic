import { Recipe } from './recipe.model';

export interface RecipeStore {
  recipes: Recipe[];
  selectedRecipe?: Recipe;
  favoriteRecipes: Recipe[];
}
