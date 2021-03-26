import {Component, OnInit} from '@angular/core';
import {PizzaService, PizzasType} from "../../services/pizza.service";
import {MatDialog} from "@angular/material/dialog";
import {OrderComponent} from "../order/order.component";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements OnInit {

  private isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);
  private dialogConfig = {
    disableClose: false,
    hasBackdrop: true,
    width: '65%',
    height: 'auto',
    maxWidth: '100vw',
    maxHeight: '100vh',
  };
  pizzas: PizzasType[] = [];
  pizzeriaName: string;
  pizzeriaId: number;

  constructor
  (
    private pizzasService: PizzaService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit(): void {
    this.pizzeriaName = this.pizzasService.putPizzeriaName();
    this.pizzeriaId = this.pizzasService.putPizzeriaId();
    this.pizzasService.getPizzas()
      .subscribe(
        (pizzas) => {
          this.pizzas = pizzas.filter((item) => {
            item.available_in_pizzerias = item.available_in_pizzerias.find(el => el === (this.pizzeriaId + 1));
            return item.available_in_pizzerias;
          })
        }
      )
  }

  onAddPizza(pizza: PizzasType) {
    this.pizzasService.addSelectedPizzas(pizza);
    const dialogRef = this.dialog.open(OrderComponent, {
      ...this.dialogConfig
    });
    this.addPopup(dialogRef);
  }

  onShowOrder() {
    const dialogRef = this.dialog.open(OrderComponent, {
      ...this.dialogConfig
    });
    this.addPopup(dialogRef);
  }

  addPopup(dialogRef) {
    const smallDialogSubscription = this.isExtraSmall.subscribe(size => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('65%', 'auto');
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      smallDialogSubscription.unsubscribe();
    });
  }
}
