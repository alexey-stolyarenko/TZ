import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PizzaService} from "../../services/pizza.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  @Output() showOrder: EventEmitter<void> = new EventEmitter<void>()

  totalCount: number = 0;

  constructor(private pizzaService: PizzaService) {}

  ngOnInit():void {
    this.pizzaService.currentCountPizzas
      .subscribe(
        (count) => {
          this.totalCount = count;
        }
      )
  }

  onShowOrder():void {
    this.showOrder.emit()  }
}
