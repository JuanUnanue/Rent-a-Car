import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { CarsModule } from './cars/cars.module';
import { ClientsModule } from './clients/clients/clients.module';
import { HomeComponent } from './home/home/home.component';
import { HomeModule } from './home/home.module';
import { ClientsManagerComponent } from './clients/clients-manager/clients-manager.component';
import { AdminModule } from './admin/module/admin/admin.module';
import { AdminFirstpageComponent } from './admin/components/admin-firstpage/admin-firstpage.component';
import { AdminGestionAdminComponent } from './admin/components/admin-gestion-admin/admin-gestion-admin.component';
import { AdminGestionVehiculosComponent } from './admin/components/admin-gestion-vehiculos/admin-gestion-vehiculos.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsManagerComponent,
    AdminFirstpageComponent,
    AdminGestionAdminComponent,
    AdminGestionVehiculosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CarsModule,
    RouterModule,
    ClientsModule,
    HomeModule,
    AdminModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
