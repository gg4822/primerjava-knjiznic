import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipe!: Recipe;
  favoritesText: string = 'Add to favorites';
  subs = new SubSink();
  constructor(private recipesService: RecipesService, private router: Router) {}

  ngOnInit(): void {
    this.subs.sink = this.recipesService.selectedRecipe$.subscribe((val) => {
      this.recipe = val;
    });
    this.subs.sink = this.recipesService.favoriteRecipes$.subscribe(
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

  addToFavorites() {
    if (this.favoritesText == 'Add to favorites') {
      this.recipesService.addRecipeToFavorites(this.recipe);
    } else {
      this.recipesService.removeRecipeFromFavorites(this.recipe);
    }
  }
  back() {
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
