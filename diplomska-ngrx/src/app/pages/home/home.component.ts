import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesFacadeService } from 'src/app/store/recipes/recipes-facade.service';
import { SubSink } from 'subsink';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  numberOfCalls = 0;
  startTime = new Date();
  endTime = new Date();

  constructor(private recipesFacade: RecipesFacadeService) {}

  ngOnInit(): void {
    this.subs.sink = this.recipesFacade.speedTestObject$.subscribe(
      (testObj) => {
        if (this.numberOfCalls === 99) {
          this.endTime = new Date(Date.now());
          console.log(
            this.startTime,
            this.endTime,
            this.endTime.getTime(),
            this.startTime.getTime(),
            this.endTime.getTime() - this.startTime.getTime()
          );
        } else {
          if (this.numberOfCalls === 0) {
            this.startTime = new Date(Date.now());
          }
          this.recipesFacade.addSpeedObjectToStore({
            id: this.numberOfCalls,
            date: new Date(Date.now()),
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          });
          this.numberOfCalls++;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
