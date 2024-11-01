import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCarsComponent } from './add-cars/add-cars.component';
import { BuyCarComponent } from './buy-car/buy-car.component';



@NgModule({
  declarations: [
    AddCarsComponent,
    BuyCarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CarsModule { }
