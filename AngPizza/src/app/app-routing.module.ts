import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {OrderComponent, PizzasComponent, PizzeriasComponent} from "./modules/pizza/components";


const routes: Routes = [
  {path: '', component: PizzeriasComponent },
  {path: 'pizzerias/:name', component: PizzasComponent },
  {path: 'basket', component: OrderComponent},
  {path: '**', redirectTo: ''}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
