import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RecipesApiService } from './recipes-api.service';
import { RecipesFacadeService } from './recipes-facade.service';
import { RecipesEffects } from './recipes.effects';
import { recipesReducer } from './recipes.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    StoreModule.forFeature('recipes', recipesReducer),
    EffectsModule.forRoot(),
    EffectsModule.forFeature([RecipesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode
    }),
  ],
  providers: [RecipesApiService, RecipesFacadeService],
})
export class RecipesStoreModule {}
