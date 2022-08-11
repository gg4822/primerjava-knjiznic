import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import {
  SideNavInnerToolbarModule,
  SideNavOuterToolbarModule,
  SingleCardModule,
} from './layouts';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { AppInfoService, ScreenService } from './shared/services';
import { RecipesApiService } from './store/recipes/recipes-api.service';
import { UnauthenticatedContentModule } from './unauthenticated-content';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipesListComponent,
    RecipeItemComponent,
    RecipeComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    DxDataGridModule,
    DxButtonModule,
  ],
  providers: [ScreenService, AppInfoService, RecipesApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
