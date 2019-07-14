import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Food } from '../food';
import { FoodService } from '../food.service';


@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css']
})
export class FoodDetailsComponent implements OnInit {

  food: Food;
  selectedFood;
  selectedMeal;
  commonFood;
  brandedFood;
  servings = 1;
  requestBody;
  brandedFoodInitialCalorie;
  calorie: { grams: number, calories: number };
  meal = [
    { label: 'Breakfast', value: 'Breakfast' },
    { label: 'Lunch', value: 'Lunch' },
    { label: 'Dinner', value: 'Dinner' },
    { label: 'Snack', value: 'Snack' },
  ]
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-app-id': 'f163490e',
    'x-app-key': '7d3909ad675522504ad2110857f836e0'
  });

  constructor(public dialog: MatDialog, public foodService: FoodService, private http: HttpClient, public dialogRef: MatDialogRef<FoodDetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) data: any) {
    this.selectedFood = data;
    if (data.nix_item_id) {
      this.brandedFood = data;
      this.brandedFood.serving_unit = this.brandedFood.serving_unit.toString().replace('"', '\\"');
    }
    else {
      this.commonFood = data;
      this.commonFood.serving_unit = this.commonFood.serving_unit.toString().replace('"', '\\"');
      this.requestBody = '{"query": "1 ' + `${this.commonFood.serving_unit}` + ' ' + `${this.commonFood.food_name}` + '"}';
    }
  }

  ngOnInit() {
    if (this.commonFood) {
      this.http.post('https://trackapi.nutritionix.com/v2/natural/nutrients', this.requestBody,
        { headers: this.headers })
        .subscribe(response => {
          this.calorie = {
            grams: Math.round(response['foods'][0].serving_weight_grams),
            calories: Math.round(response['foods'][0].nf_calories)
          }
        });
    } else {
      this.brandedFood.nf_calories = Math.round(this.brandedFood.nf_calories);
      this.brandedFoodInitialCalorie = this.brandedFood.nf_calories;
    }
  }

  reCalculate(servings: number) {
    if (this.commonFood) {
      this.requestBody = '{"query": "' + servings + ' ' + `${this.commonFood.serving_unit}` + ' ' + `${this.commonFood.food_name}` + '"}';
      this.http.post('https://trackapi.nutritionix.com/v2/natural/nutrients', this.requestBody,
        { headers: this.headers })
        .subscribe(response => {
          this.calorie = {
            grams: Math.round(response['foods'][0].serving_weight_grams),
            calories: Math.round(response['foods'][0].nf_calories)
          }
        });
    } else {
      this.brandedFood.nf_calories = servings * this.brandedFoodInitialCalorie;
      servings = 1;
    }
  }

  addFood(meal: string) {
    this.foodService.changeToToday();
    if (this.commonFood) {
      this.food = {
        nix_item_id: null,
        food_name: this.commonFood.food_name,
        meal_type: meal,
        nf_calories: this.calorie.calories,
        serving_qty: this.servings,
        serving_unit: this.commonFood.serving_unit,
        serving_size: null,
        serving_weight_grams: this.calorie.grams,
        thumb: this.commonFood.photo.thumb
      };
      this.foodService.addFood(this.food);
    } else {
      this.food = {
        nix_item_id: this.brandedFood.nix_item_id,
        food_name: this.brandedFood.food_name,
        meal_type: meal,
        nf_calories: this.brandedFood.nf_calories,
        serving_qty: this.servings,
        serving_unit: this.brandedFood.serving_unit,
        serving_size: null,
        serving_weight_grams: this.brandedFood.serving_weight_grams,
        thumb: this.brandedFood.photo.thumb
      };
      this.foodService.addFood(this.food);
    }
    this.dialogRef.close();
  }

}
