import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesFacadeService } from 'src/app/store/recipes-store/recipes-facade.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: Recipe[] = [];
  subs = new SubSink();

  constructor(private recipesFacade: RecipesFacadeService) {}

  ngOnInit(): void {
    this.subs.sink = this.recipesFacade.favoriteRecipes$.subscribe(
      (val) => (this.favorites = val)
    );
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
