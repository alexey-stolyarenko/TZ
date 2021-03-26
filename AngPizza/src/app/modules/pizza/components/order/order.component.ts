import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {PizzaService, PizzasType} from "../../services/pizza.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  selectPizzas: PizzasType[] = [];
  subTotalPriceOrder: number = 0;
  totalTaxOrder: number;
  totalPriceOrder: number;

  constructor(
    public dialogRef: MatDialogRef<OrderComponent>,
    private pizzaService: PizzaService
  ) {
  }

  ngOnInit(): void {
    this.pizzaService.currentSelPizza.subscribe(
      (data) => {
        this.selectPizzas = data;
        this.totalTaxOrder = this.pizzaService.getTotalTax();
        this.subTotalPriceOrder = this.pizzaService.getSubtotalPrice();
        this.getTotalPrice();
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeletePizza(deletePizzaId) {
    this.selectPizzas = this.selectPizzas.filter((item) => item.id !== deletePizzaId);
    this.pizzaService.getDeletePizza(deletePizzaId);
    this.subTotalPriceOrder = this.pizzaService.getSubtotalPrice();
    this.totalTaxOrder = this.pizzaService.getTotalTax();
    this.getTotalPrice();
  }

  onChangeCountPizza(count) {
    this.pizzaService.getLocalCountOrder(count);
    this.selectPizzas = this.pizzaService.putSelectedPizzas();
    this.subTotalPriceOrder = this.pizzaService.getSubtotalPrice();
    this.totalTaxOrder = this.pizzaService.getTotalTax();
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.totalPriceOrder = this.totalTaxOrder + this.subTotalPriceOrder;
  }

  createPost() {
    const result = this.pizzaService.createPost();
    console.log(result);
    this.pizzaService.zeroingSelectedPizza();
  }
}
