import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './car-details/car-details.component';
import { ListCarsComponent } from './list-cars/list-cars.component';
import { AppComponent } from './app.component';
const routes: Routes = [
  {path: 'car-details/:id', component: CarDetailsComponent},
  {path: 'list-cars',component:ListCarsComponent},
  {path: '', redirectTo: '/list-cars', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
