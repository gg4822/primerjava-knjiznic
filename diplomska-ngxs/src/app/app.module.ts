import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule, DxScrollViewModule } from 'devextreme-angular';
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
import { AppInfoService, AuthService, ScreenService } from './shared/services';
import { RecipesStoreModule } from './store/recipes-store/recipes-store.module';
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
    DxScrollViewModule,
    DxButtonModule,
    RecipesStoreModule,
  ],
  providers: [AuthService, ScreenService, AppInfoService, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
