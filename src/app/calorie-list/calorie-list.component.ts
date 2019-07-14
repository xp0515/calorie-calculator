import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calorie-list',
  templateUrl: './calorie-list.component.html',
  styleUrls: ['./calorie-list.component.css']
})
export class CalorieListComponent implements OnInit {
  foodList;
  foodsSub: Subscription;

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    // this.foodList = this.foodService.getFoodList();
    this.foodsSub = this.foodService.getfoodListUpdatedListener()
      .subscribe((foodList) => {
        this.foodList = foodList;
      })
  }

}
