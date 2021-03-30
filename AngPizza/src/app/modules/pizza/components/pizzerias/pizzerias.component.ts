import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PizzaService, PizzeriasType} from "../../services/pizza.service";

@Component({
  selector: 'app-pizzerias',
  templateUrl: './pizzerias.component.html',
  styleUrls: ['./pizzerias.component.scss']
})
export class PizzeriasComponent implements OnInit {

  pizzerias: PizzeriasType[] = [];

  constructor(private http: HttpClient, private pizzaService: PizzaService,) {
  }

  ngOnInit(): void {
    this.pizzaService.getPizzerias()
      .subscribe(
        (pizzeriasInfo) => {
             this.pizzerias = pizzeriasInfo
        },
        (error) => {
          console.log(error);
        }
      )
    this.pizzaService.putTotalCountOrder(0);
    this.pizzaService.zeroingSelectedPizza();
  }

  onChoose(pizzerias) {
    this.pizzaService.getPizzeriaInfo(pizzerias);
  }
}
