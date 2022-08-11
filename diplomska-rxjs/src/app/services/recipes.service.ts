import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  rapidApiKey = '19e8286083msh6cf5242331effcdp18befbjsn18ca66a4de02';

  private selectedRecipe = new BehaviorSubject({} as Recipe);
  public selectedRecipe$ = this.selectedRecipe.asObservable();

  private favoriteRecipes = new BehaviorSubject([] as Recipe[]);
  public favoriteRecipes$ = this.favoriteRecipes.asObservable();

  private recipes = new BehaviorSubject([] as Recipe[]);
  public recipes$ = this.recipes.asObservable();

  constructor(private http: HttpClient) {}

  getNRandomRecipes(n: number) {
    const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'random-recipes.p.rapidapi.com')
      .set('x-rapidapi-key', this.rapidApiKey);
    return this.http.get<Recipe[]>(
      'https://random-recipes.p.rapidapi.com/ai-quotes/' + n,
      {
        headers,
      }
    );
  }

  setSelectedRecipe(recipe: Recipe) {
    this.selectedRecipe.next(recipe);
  }

  getRecipeById(id: number) {
    let currentRecipes = this.recipes.value;
    this.selectedRecipe.next(
      currentRecipes.find((recipe) => recipe.id === id)!
    );
  }

  getFavoriteById(id: number) {
    let currentFavorites = this.favoriteRecipes.value;
    this.selectedRecipe.next(
      currentFavorites.find((recipe) => recipe.id === id)!
    );
  }

  addRecipeToFavorites(recipe: Recipe) {
    let currentArray = this.favoriteRecipes.value;
    let updatedArray = [...currentArray, recipe];
    this.favoriteRecipes.next(updatedArray);
  }

  removeRecipeFromFavorites(recipe: Recipe) {
    let currentArray = this.favoriteRecipes.value;
    let index = currentArray.findIndex((val) => val === recipe);
    currentArray.splice(index, 1);
    this.favoriteRecipes.next(currentArray);
  }

  updateRecipes(recipes: Recipe[]) {
    this.recipes.next(recipes);
  }
}
