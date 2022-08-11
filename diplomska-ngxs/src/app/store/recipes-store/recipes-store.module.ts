import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { RecipesApiService } from './recipes-api.service';
import { RecipesFacadeService } from './recipes-facade.service';
import { RecipesState } from './recipes.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([RecipesState], { developmentMode: true }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [RecipesApiService, RecipesFacadeService],
})
export class RecipesStoreModule {}
