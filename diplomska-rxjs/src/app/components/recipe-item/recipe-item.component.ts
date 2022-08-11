import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
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

  constructor(private router: Router, private recipesService: RecipesService) {}

  ngOnInit(): void {
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

  redirectToRecipe() {
    this.recipesService.setSelectedRecipe(this.recipe);
    this.router.navigateByUrl('/recipe/' + this.recipe.id);
  }

  addToFavorites() {
    if (this.favoritesText == 'Add to favorites') {
      this.recipesService.addRecipeToFavorites(this.recipe);
    } else {
      this.recipesService.removeRecipeFromFavorites(this.recipe);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
