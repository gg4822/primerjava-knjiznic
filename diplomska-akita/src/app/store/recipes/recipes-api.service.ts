import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesApiService {
  rapidApiKey = '19e8286083msh6cf5242331effcdp18befbjsn18ca66a4de02';
  constructor(private http: HttpClient) {}

  getNRandomRecipes(n: number) {
    const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'random-recipes.p.rapidapi.com')
      .set('x-rapidapi-key', this.rapidApiKey);
    return this.http.get<Recipe[]>(
      'https://random-recipes.p.rapidapi.com/ai-quotes/' + n,
      {
        headers,
      }
    );
  }
}
