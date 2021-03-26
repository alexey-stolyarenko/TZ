import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PizzaModule} from "./modules/pizza/pizza.module";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OrderComponent} from "./modules/pizza/components";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PizzaModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [OrderComponent]
})
export class AppModule {
}
