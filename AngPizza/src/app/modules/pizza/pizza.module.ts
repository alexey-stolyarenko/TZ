import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BasketComponent,
  OrderComponent,
  PizzaOrderListComponent,
  PizzasComponent,
  PizzeriasComponent
} from "./components";

import {RouterModule} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";



const DECLARATIONS = [
  PizzeriasComponent,
  PizzasComponent,
  BasketComponent,
  OrderComponent,
  PizzaOrderListComponent
]

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule
  ],

})
export class PizzaModule { }
