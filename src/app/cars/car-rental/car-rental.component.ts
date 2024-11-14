import { Component, OnInit } from '@angular/core';
import { CarsModule } from '../cars.module';
import { CarService } from '../services/car.service';
import { Car } from '../models/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DistanceCalculatorService } from '../services/distance-calculator.service';
import { ClientService } from '../../clients/services/client.service';
import { PaymentService } from '../../payment/payment/services/payment.service';
import { Rental } from '../models/rental';
import { Purchase } from '../models/purchase';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrl: './car-rental.component.css'
})
export class CarRentalComponent implements OnInit {
  carForm: FormGroup;
  branches = ['Mar del Plata', 'Córdoba', 'Bariloche'];
  minEndDate: string = '';
  distance: string='';
  messagePrice: string='';
  carryPrice:number=0;
  totalPrice: string='';

  constructor(private fb: FormBuilder, private distanceCalculator: DistanceCalculatorService) {
    this.carForm = this.fb.group({
      rentalStartDate: ['', Validators.required],
      rentalEndDate: ['', Validators.required],
      originBranch: ['', Validators.required],
      destinationBranch: ['', Validators.required]
    }, { validator: this.endDateAfterStartDateValidator });
  }

  ngOnInit(): void {
    this.carForm.get('rentalStartDate')?.valueChanges.subscribe((startDate) => {
      this.minEndDate = startDate;
      this.carForm.get('rentalEndDate')?.updateValueAndValidity();
    });
  }

  endDateAfterStartDateValidator(group: FormGroup) {
    const startDate = group.get('rentalStartDate')?.value;
    const endDate = group.get('rentalEndDate')?.value;
    return startDate && endDate && endDate >= startDate ? null : { endDateInvalid: true };
  }

  onSubmit() {
    
  }

  calculateDistanceAndCarryPrice(origins: string, destination: string): void {
    this.distanceCalculator.getDistance(origins, destination).subscribe(response => {
      const dist = response.rows[0].elements[0].distance.text;
      this.distance = `La distancia total es ${dist}`;
  
      if (origins === destination) {
        this.carryPrice = 0;
      } else {
        this.carryPrice = parseFloat(dist) * 30;
      }
  
      this.messagePrice = `El precio del acarreo es de $${this.carryPrice.toLocaleString()}`;
  
      
      const rentalStartDate = this.carForm.get('rentalStartDate')?.value;
      const rentalEndDate = this.carForm.get('rentalEndDate')?.value;
  
      if (rentalStartDate && rentalEndDate) {
        const startDate = new Date(rentalStartDate);
        const endDate = new Date(rentalEndDate);
        const timeDiff = endDate.getTime() - startDate.getTime();
        const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
        const rentalPrice = this.carryPrice + (numDays * 50); 
        this.totalPrice = `El precio total del alquiler es de $${rentalPrice.toLocaleString()}`;
      } else {
        this.totalPrice = '';
      }
    });
  }
  
}