import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { RecipesApiService } from './recipes-api.service';
import * as RecipesActions from './recipes.actions';

@Injectable()
export class RecipesEffects {
  constructor(
    private actions: Actions,
    private recipesApiService: RecipesApiService
  ) {}

  loadrecipes$ = createEffect(() =>
    this.actions.pipe(
      ofType(RecipesActions.loadRecipes),
      mergeMap(() =>
        this.recipesApiService.getNRandomRecipes(15).pipe(
          map((recipes) => RecipesActions.loadRecipesSuccess({ recipes })),
          catchError(() => of(RecipesActions.loadRecipesFail()))
        )
      )
    )
  );
}
