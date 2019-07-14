import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { Subscription } from 'rxjs';
import { Food } from '../food';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  progressValue: number;
  breakfastCalories;
  lunchCalories;
  dinnerCalories;
  snackCalories;
  totalCalories;
  foodsSub: Subscription;
  foodList: Food[] = [];
  date;

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.date = this.foodService.getDay();
    this.foodService.getFoodList();
    this.foodsSub = this.foodService.getfoodListUpdatedListener()
      .subscribe((foodList) => {
        this.foodList = foodList;
        this.breakfastCalories = this.getBreakfastCalories();
        this.lunchCalories = this.getLunchCalories();
        this.dinnerCalories = this.getDinnerCalories();
        this.snackCalories = this.getSnackCalories();
        this.totalCalories = this.breakfastCalories + this.lunchCalories + this.dinnerCalories + this.snackCalories;
        this.progressValue = Math.round(this.totalCalories / 1500 * 100);
      })
  }

  getBreakfastCalories() {
    let breakfastList = [];
    this.foodList.map(food => {
      if (food.meal_type.toLowerCase() === 'breakfast') {
        breakfastList.push(food.nf_calories);
      }
    })
    return breakfastList.reduce((a, b) => a + b, 0)
  }

  getLunchCalories() {
    let lunchList = [];
    this.foodList.map(food => {
      if (food.meal_type.toLowerCase() === 'lunch') {
        lunchList.push(food.nf_calories);
      }
    })
    return lunchList.reduce((a, b) => a + b, 0)
  }

  getDinnerCalories() {
    let dinnerList = [];
    this.foodList.map(food => {
      if (food.meal_type.toLowerCase() === 'dinner') {
        dinnerList.push(food.nf_calories);
      }
    })
    return dinnerList.reduce((a, b) => a + b, 0)
  }

  getSnackCalories() {
    let snackList = [];
    this.foodList.map(food => {
      if (food.meal_type.toLowerCase() === 'snack') {
        snackList.push(food.nf_calories);
      }
    })
    return snackList.reduce((a, b) => a + b, 0)
  }

}
