import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { FoodDetailsComponent } from '../food-details/food-details.component';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})

export class FoodListComponent implements OnInit {
  foodlist;
  commonFoodList = [];
  brandedFoodList = [];

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<FoodListComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) data: any) {
    this.foodlist = data;
  }

  ngOnInit() {
    this.commonFoodList = this.foodlist.common;
    this.brandedFoodList = this.foodlist.branded;
  }

  searchFoodDetails(food) {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(FoodDetailsComponent, { data: food });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
