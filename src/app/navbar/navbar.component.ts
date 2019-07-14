import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { FoodListComponent } from '../food-list/food-list.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FoodService } from '../food.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog, private http: HttpClient, public foodService: FoodService) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-app-id': 'f163490e',
    'x-app-key': '7d3909ad675522504ad2110857f836e0'
  });
  food;
  foods;
  day = "Today";

  ngOnInit() {
    this.day = this.foodService.getDay();
  }

  searchFoods(food) {
    this.day = "Today";
    this.http.get('https://trackapi.nutritionix.com/v2/search/instant', { headers: this.headers, params: { query: food } })
      .subscribe(foods => {
        const dialogConfig = new MatDialogConfig();
        this.dialog.open(FoodListComponent, { data: foods });
      });
    this.food = "";
  }

  switchDayLast() {
    this.day = this.foodService.switchDayLast();
  }

  switchDayNext() {
    this.day = this.foodService.switchDayNext();
  }

}


