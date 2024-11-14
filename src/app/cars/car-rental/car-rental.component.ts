import { Component } from '@angular/core';
import { CarsModule } from '../cars.module';
import { CarService } from '../services/car.service';
import { Car } from '../models/car';
import { FormBuilder, FormGroup } from '@angular/forms';
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
export class CarRentalComponent {

  carForm: FormGroup;
  car: Car | null = null;
  rentalStartDate: Date | null = null;
  rentalEndDate: Date | null = null
  distance: string='';
  messagePrice: string='';
  carryPrice:number=0;
  loading: any;
  error: any;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private distanceCalculator: DistanceCalculatorService,
    private clientService: ClientService,
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.carForm = this.fb.group({
      rentalStartDate: [''],
      rentalEndDate: [''],
      destination: ['']
    });
  }

  ngOnInit(): void {
 
    const carId = this.route.snapshot.paramMap.get('id');

    this.carService.saveCarId(Number(carId));

    this.carService.getCars().subscribe({
      next: (cars) => {
        this.carService.cars = cars;  // Actualiza la lista en el servicio
        this.car = this.carService.cars.find(car => car.id.toString() === carId) || null;
      },
      error: (error) => {
        console.error('Error al cargar el coche:', error);
      }
    });
  }

  ngOnSubmit(){
    if(!this.car?.isForSale){
      const rental: Rental={
        clientId: this.clientService.getLoggedInClientId()!,
        carId: Number(this.route.snapshot.paramMap.get('id')),
        rentalStartDate : this.carForm.get('rentalStartDate')?.value,
        rentalEndDate : this.carForm.get('rentalEndDate')?.value,
        price: this.car ? this.car.price + this.carryPrice : this.carryPrice,
        originBranch: 'Mar del Plata', // PONER QUE LEA LA SUCURSAL DEL AUTO
        destinationBranch: 'Córdoba' // PONER QUE LEA EL SELECt
      } 
      this.paymentService.saveRentalData(rental);
      console.log(rental);

      }
    if(this.car?.isForSale){
      const purchase: Purchase={
        clientId: this.clientService.getLoggedInClientId()!,
        carId: Number(this.route.snapshot.paramMap.get('id')),
        price: this.car ? this.car.price + this.carryPrice : this.carryPrice
      }
      this.paymentService.savePurchaseData(purchase);
      console.log(purchase);
    }
    this.router.navigate(['/payment',this.car?.id]);



  }
  


  calculateDistanceAndCarryPrice(destination:string):void{
    const origins='Mar del Plata';                        // Poner que sea car.sucursal cuando tengamos definido como van a ser las sucursales
    this.distanceCalculator.getDistance(origins,destination).subscribe(response =>{
      const dist= response.rows[0].elements[0].distance.text;
      this.distance= `La distancia total es  ${dist}`;
      this.carryPrice= parseFloat(dist)*30;
      this.messagePrice=`El precio del acarreo es de ${this.carryPrice}`   // Mejorar esto, para que el monto se pueda actualizar desde admin
    });
  }

}