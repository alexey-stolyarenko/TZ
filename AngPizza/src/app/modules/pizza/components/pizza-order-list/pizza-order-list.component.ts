import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PizzasType} from "../../services/pizza.service";

@Component({
  selector: 'app-pizza-order-list',
  templateUrl: './pizza-order-list.component.html',
  styleUrls: ['./pizza-order-list.component.scss']
})
export class PizzaOrderListComponent {
  @Input() selectedPizza: PizzasType;
  @Output() deletePizza: EventEmitter<number> = new EventEmitter<number>();
  @Output() changeCountPizza: EventEmitter<{ id: number, count: number }> = new EventEmitter<{ id: number, count: number }>();

  onDeletePizza() {
    this.deletePizza.emit(this.selectedPizza.id);
  }

  onChangeCount(event) {
    this.changeCountPizza.emit({id: this.selectedPizza.id, count: +event.target.value});
  }
}
