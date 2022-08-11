import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesFacadeService } from 'src/app/store/recipes/recipes-facade.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  constructor(private recipesFacade: RecipesFacadeService) {}

  subs = new SubSink();
  recipes: Recipe[] = [];

  ngOnInit(): void {
    this.recipesFacade.loadRecipes();
    this.subs.sink = this.recipesFacade.recipes$.subscribe(
      (val) => (this.recipes = val)
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
