import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  constructor(private recipesService: RecipesService) {}

  subs = new SubSink();
  recipes: Recipe[] = [];

  ngOnInit(): void {
    this.recipesService.getNRandomRecipes(15).subscribe((recipes) => {
      this.recipesService.updateRecipes(recipes);
    });
    this.subs.sink = this.recipesService.recipes$.subscribe(
      (val) => (this.recipes = val)
    );
    this.subs.sink = this.recipesService.selectedRecipe$.subscribe((val) =>
      console.log(val, 'selected')
    );
    this.subs.sink = this.recipesService.favoriteRecipes$.subscribe((val) =>
      console.log(val, 'favorites')
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
