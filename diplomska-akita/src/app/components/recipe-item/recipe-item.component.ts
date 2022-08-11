import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesFacadeService } from 'src/app/store/recipes/recipes-facade.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit, OnDestroy {
  @Input() recipe!: Recipe;
  favoritesText: string = 'Add to favorites';
  subs = new SubSink();

  constructor(
    private router: Router,
    private recipesFacade: RecipesFacadeService
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.recipesFacade.favoriteRecipes$.subscribe(
      (recipes: Recipe[]) => {
        let exists = recipes.find((recipe) => recipe.id === this.recipe.id);
        if (exists) {
          this.favoritesText = 'Remove from favorites';
        } else {
          this.favoritesText = 'Add to favorites';
        }
      }
    );
  }

  redirectToRecipe() {
    this.recipesFacade.selectRecipe(this.recipe);
    this.router.navigateByUrl('/recipe/' + this.recipe.id);
  }

  addToFavorites() {
    if (this.favoritesText == 'Add to favorites') {
      this.recipesFacade.addToFavorites(this.recipe);
    } else {
      this.recipesFacade.removeFromFavorites(this.recipe);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
