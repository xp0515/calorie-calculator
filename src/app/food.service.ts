import { Injectable } from '@angular/core';
import { Food } from './food';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FoodService {
  foodList: Food[] = [];
  private foodListUpdated = new Subject<Food[]>();
  day = "Today";
  diet = [
    {
      //today's date
      date: 'Today',
      //empty, let user do the input
      intake_list: []
    },
    {
      //yesterday's date
      date: 'Yesterday',
      intake_list: [
        {
          //branded food has nix_item_id, common food doesn't
          "nix_item_id": "55c9298af0432259369100c4",
          "food_name": "Italian sausage",
          "serving_unit": "link",
          //weight of "serving_qty"
          "serving_weight_grams": 75,
          //per unit of "nf_calories", see how Nutritionix website demo works
          "serving_qty": 1,
          //that is per "serving_qty", see how Nutritionix website demo works
          "nf_calories": 258,
          //that is how much user ate
          "serving_size": 2,
          "meal_type": "breakfast",
          "thumb": "https://d1r9wva3zcpswd.cloudfront.net/55c92acdf04322593691010c.jpeg"
        },
        {
          "nix_item_id": "",
          "food_name": "salmon salad",
          "serving_unit": "cup",
          "serving_weight_grams": 407.01,
          "serving_qty": 1,
          "nf_calories": 389.27,
          "serving_size": 1.5,
          "meal_type": "lunch",
          "thumb": "https://d2xdmhkmkbyw75.cloudfront.net/3121_thumb.jpg"
        },
        {
          "nix_item_id": "",
          "food_name": "boneless skinless chicken breasts",
          "serving_qty": 1,
          "serving_unit": "breast",
          "serving_weight_grams": 120,
          "nf_calories": 198,
          "serving_size": 2,
          "meal_type": "dinner",
          "thumb": "https://d2xdmhkmkbyw75.cloudfront.net/7820_thumb.jpg"

        },
        {
          "nix_item_id": "",
          "food_name": "slice cheese",
          "serving_qty": 1,
          "serving_unit": "slice",
          "serving_weight_grams": 28,
          "nf_calories": 113.12,
          "serving_size": 2,
          "meal_type": "snack",
          "thumb": "https://d2xdmhkmkbyw75.cloudfront.net/8185_thumb.jpg"
        },
        {
          "nix_item_id": "",
          "food_name": "orange",
          "serving_qty": 1,
          "serving_unit": "fruit (2-7/8\" dia)",
          "serving_weight_grams": 140,
          "nf_calories": 68.6,
          "serving_size": 2,
          "meal_type": "snack",
          "thumb": "https://d2xdmhkmkbyw75.cloudfront.net/719_thumb.jpg"
        }
      ]
    },
    {
      //2 days ago
      date: '2 days ago',
      intake_list: [
        {
          "nix_item_id": "",
          "food_name": "fried eggs",
          "serving_qty": 1,
          "serving_unit": "large",
          "serving_weight_grams": 46,
          "nf_calories": 90.16,
          "serving_size": 2,
          "meal_type": "breakfast",
          "thumb": "https://d2xdmhkmkbyw75.cloudfront.net/1741_thumb.jpg"
        },
        {
          "nix_item_id": "",
          "food_name": "chicken salad",
          "serving_qty": 0.5,
          "serving_unit": "cup",
          "serving_weight_grams": 112.1,
          "nf_calories": 253.99,
          "serving_size": 1,
          "meal_type": "lunch",
          "thumb": "https://d2xdmhkmkbyw75.cloudfront.net/3121_thumb.jpg"
        },
        {
          "nix_item_id": "598c0695306b814040ff908b",
          "food_name": "Boneless Skinless Chicken Breasts",
          "serving_unit": "oz",
          "serving_qty": 4,
          "nf_calories": 110,
          "serving_size": 1,
          "meal_type": "dinner",
          "thumb": "https://d1r9wva3zcpswd.cloudfront.net/5c04d53ff01a65ec7b2089dd.jpeg"

        },
        {
          "nix_item_id": "",
          "food_name": "slice cheese",
          "serving_qty": 1,
          "serving_unit": "slice",
          "serving_weight_grams": 28,
          "nf_calories": 113.12,
          "serving_size": 2,
          "meal_type": "snack",
          "thumb": "https://d2xdmhkmkbyw75.cloudfront.net/8185_thumb.jpg"
        },
        {
          "nix_item_id": "",
          "food_name": "orange",
          "serving_qty": 1,
          "serving_unit": "fruit (2-7/8\" dia)",
          "serving_weight_grams": 140,
          "nf_calories": 68.6,
          "serving_size": 2,
          "meal_type": "snack",
          "thumb": "https://d2xdmhkmkbyw75.cloudfront.net/719_thumb.jpg"
        }
      ]
    }
  ];

  constructor() { }

  addFood(food: Food) {
    this.diet[0].intake_list.push(food);
    this.getFoodList();
  }

  getfoodListUpdatedListener() {
    return this.foodListUpdated.asObservable();
  }

  getFoodList() {
    if (this.day === "Today") {
      this.foodList = this.diet[0].intake_list.map(intake => ({
        nix_item_id: intake.nix_item_id,
        food_name: intake.food_name,
        meal_type: intake.meal_type,
        nf_calories: Math.round(intake.nf_calories),
        serving_qty: intake.serving_qty,
        serving_unit: intake.serving_unit,
        serving_size: intake.serving_size,
        serving_weight_grams: Math.round(intake.serving_weight_grams),
        thumb: intake.thumb
      }));
      return this.foodListUpdated.next([...this.foodList]);
    }
    else if (this.day === "Yesterday") {
      this.foodList = this.diet[1].intake_list.map(intake => ({
        nix_item_id: intake.nix_item_id,
        food_name: intake.food_name,
        meal_type: intake.meal_type,
        nf_calories: Math.round(intake.nf_calories),
        serving_qty: intake.serving_qty,
        serving_unit: intake.serving_unit,
        serving_size: intake.serving_size,
        serving_weight_grams: Math.round(intake.serving_weight_grams),
        thumb: intake.thumb
      }));
      return this.foodListUpdated.next([...this.foodList]);
    }
    else {
      this.foodList = this.diet[2].intake_list.map(intake => ({
        nix_item_id: intake.nix_item_id,
        food_name: intake.food_name,
        meal_type: intake.meal_type,
        nf_calories: Math.round(intake.nf_calories),
        serving_qty: intake.serving_qty,
        serving_unit: intake.serving_unit,
        serving_size: intake.serving_size,
        serving_weight_grams: Math.round(intake.serving_weight_grams),
        thumb: intake.thumb
      }));
      return this.foodListUpdated.next([...this.foodList]);
    }
  }

  switchDayLast() {
    if (this.day === "Today") {
      this.day = "Yesterday";
      this.getFoodList();
      return "Yesterday";
    }
    if (this.day === "Yesterday") {
      this.day = "2 days ago";
      this.getFoodList();
      return "2 days ago";
    }
    if (this.day === "2 days ago") {
      return "2 days ago";
    }
  }

  switchDayNext() {
    if (this.day === "Today") {
      return "Today";
    }
    if (this.day === "Yesterday") {
      this.day = "Today";
      this.getFoodList();
      return "Today";
    }
    if (this.day === "2 days ago") {
      this.day = "Yesterday";
      this.getFoodList();
      return "Yesterday";
    }
  }

  changeToToday() {
    this.day = "Today";
  }

  getDay() {
    return this.day;
  }

}
