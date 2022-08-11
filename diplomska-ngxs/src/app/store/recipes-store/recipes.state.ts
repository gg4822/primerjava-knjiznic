import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesApiService } from './recipes-api.service';

export interface RecipesStateModel {
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

export class LoadRecipes {
  static readonly type = '[Recipes] Load recipes';
}

export class SelectRecipe {
  static readonly type = '[Recipes] Select recipe';
  constructor(public recipe: Recipe) {}
}

export class AddToFavorites {
  static readonly type = '[Recipes] Add to favorites';
  constructor(public recipe: Recipe) {}
}

export class RemoveFromFavorites {
  static readonly type = '[Recipes] Remove from favorites';
  constructor(public recipe: Recipe) {}
}

export class SpeedTestAction {
  static readonly type = '[Recipes] Speed test';
  constructor(public testObject: TestObj) {}
}

@State<RecipesStateModel>({
  name: 'recipes',
  defaults: {
    recipes: [],
    favoriteRecipes: [],
    speedTestObject: {
      id: 0,
      date: new Date(),
      text: '',
    },
  },
})
@Injectable()
export class RecipesState {
  constructor(private recipesApiService: RecipesApiService) {}

  @Action(LoadRecipes)
  loadRecipes(ctx: StateContext<RecipesStateModel>, action: LoadRecipes) {
    return this.recipesApiService.getNRandomRecipes(15).pipe(
      tap((recipes) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          recipes: recipes,
        });
      })
    );
  }

  @Action(SelectRecipe)
  selectRecipe(ctx: StateContext<RecipesStateModel>, action: SelectRecipe) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selectedRecipe: action.recipe,
    });
  }

  @Action(AddToFavorites)
  addToFavorites(ctx: StateContext<RecipesStateModel>, action: AddToFavorites) {
    const state = ctx.getState();
    let favorites = [...state.favoriteRecipes];
    favorites.push(action.recipe);
    ctx.setState({
      ...state,
      favoriteRecipes: favorites,
    });
  }

  @Action(RemoveFromFavorites)
  removeFromFavorites(
    ctx: StateContext<RecipesStateModel>,
    action: RemoveFromFavorites
  ) {
    const state = ctx.getState();
    let favorites = [...state.favoriteRecipes];
    favorites.splice(
      favorites.findIndex((i) => i.id === action.recipe.id),
      1
    );
    ctx.setState({
      ...state,
      favoriteRecipes: favorites,
    });
  }

  @Action(SpeedTestAction)
  addSpeedObjectToStore(
    ctx: StateContext<RecipesStateModel>,
    action: SpeedTestAction
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      speedTestObject: action.testObject,
    });
  }
}
