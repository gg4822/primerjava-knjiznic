import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: Recipe[] = [];
  subs = new SubSink();

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.subs.sink = this.recipesService.favoriteRecipes$.subscribe(
      (val) => (this.favorites = val)
    );
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
