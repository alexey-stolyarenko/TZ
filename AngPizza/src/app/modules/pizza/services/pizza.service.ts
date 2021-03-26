import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

export interface PizzeriasType {
  id: number,
  name: string,
  address: string,
  country: string
}

export interface PizzasType {
  id: number,
  name: string,
  is_taxed: boolean,
  au_tax_rate: string,
  nz_tax_rate: string,
  description: string,
  image_url?: string,
  available_in_pizzerias: [],
  price: string,
  count?: number
}

@Injectable({
  providedIn: 'root',
})

export class PizzaService {
  private globalUrl: string = 'assets/api/';
  private globalTax = [];
  private pizzeriaInfo: PizzeriasType;
  private selectPizza = [];
  totalTaxOrder: number;
  totalTaxSubPrice: number;

  private countPizzas = new BehaviorSubject(0);
  currentCountPizzas = this.countPizzas.asObservable();

  private selPizza = new BehaviorSubject([]);
  currentSelPizza = this.selPizza.asObservable();

  constructor(private http: HttpClient) {
    this.getGlobalTax();
  }

  getPizzerias(): Observable<PizzeriasType[]> {
    return this.http.get <PizzeriasType[]>(this.globalUrl + 'pizzerias.json');
  }

  getPizzas(): Observable<PizzasType[]> {
    return this.http.get<PizzasType[]>(this.globalUrl + 'pizza_templates.json');
  }

  getGlobalTax() {
    this.http.get(this.globalUrl + 'settings.json')
      .subscribe((tax) => this.globalTax.push(tax));
  }

  getPizzeriaInfo(info: PizzeriasType) {
    return this.pizzeriaInfo = info;
  }

  putPizzeriaName(): string {
    if (this.pizzeriaInfo) {
      return this.pizzeriaInfo.name;
    }
  }

  putPizzeriaId(): number {
    if (this.pizzeriaInfo) {
      return this.pizzeriaInfo.id;
    }
  }

  addSelectedPizzas(pizza: PizzasType) {
    const availabilityId = this.selectPizza.some(item => item.id === pizza.id);
    if (availabilityId) {
      this.checkAddSamePizzas(pizza);
    } else {
      pizza.count = 1;
      this.selectPizza.unshift(pizza);
    }
    this.selPizza.next(this.selectPizza);
    this.getTotalCountOrder();
  }

  putSelectedPizzas(): PizzasType[] {
    return this.selectPizza;
  }

  zeroingSelectedPizza(): void {
    this.selectPizza = [];
  }

  getDeletePizza(pizzaId: number) {
    this.selectPizza = this.selectPizza.filter((item) => item.id !== pizzaId);
    this.getTotalCountOrder();
    this.selPizza.next(this.selectPizza);
  }

  private checkAddSamePizzas(pizza) {
    const index = this.selectPizza.findIndex((item) => item.id === pizza.id);
    this.selectPizza[index].count = this.selectPizza[index].count + 1;
  }

  getTotalCountOrder() {
    let count = 0;
    this.selectPizza.forEach((item) => {
      item.count ? count += item.count : count += 1
    })
    this.countPizzas.next(count);
  }

  putTotalCountOrder(count) {
    this.countPizzas.next(count);
  }

  getLocalCountOrder(pizza) {
    const idx = this.selectPizza.findIndex((item) => item.id === pizza.id);
    this.selectPizza[idx].count = pizza.count;
    this.getTotalCountOrder();
    this.selPizza.next(this.selectPizza);
  }

  getTotalTax(): number {
    const taxedArr = this.selectPizza.filter((item) => item.is_taxed === true);
    let totalTax = 0;
    taxedArr.forEach((item) => {
      totalTax += ((+item.price) * (item.count) * ((+this.globalTax[0].us_tax_rate) / 100))
    })
    this.totalTaxOrder = (Math.floor(totalTax * 100) / 100);
    return totalTax;
  }

  getSubtotalPrice(): number {
    let subTotalPriceOrder = 0;
    this.selectPizza.forEach((item) => {
      subTotalPriceOrder += (+(item.price) * +(item.count))
    })
    this.totalTaxSubPrice = (Math.floor(subTotalPriceOrder * 100) / 100);
    return subTotalPriceOrder;
  }

  createPost() {
    const pizza_items = [];
    let result;
    this.selectPizza.forEach((item) => {
      if (item.is_taxed) {
        pizza_items.push({
          pizza_id: item.id,
          quantity: item.count,
          subtotal: (Math.floor(item.count * +item.price*100)/100),
          tax: (Math.floor((item.count * +item.price * ((this.globalTax[0].us_tax_rate) / 100)) * 100) / 100),
          total: (Math.floor(((item.count * (+item.price)) + (item.count * (+item.price)) * ((this.globalTax[0].us_tax_rate / 100))) * 100) / 100),
        })
      } else {
        pizza_items.push({
          pizza_id: item.id,
          quantity: item.count,
          subtotal: +item.price,
          tax: 0,
          total: (item.count * (+item.price)),
        })
      }
    })
    result = {
      pizzeria_id: this.pizzeriaInfo.id,
      pizza_items: pizza_items,
      subtotal: this.totalTaxSubPrice,
      tax: this.totalTaxOrder,
      total: (this.totalTaxSubPrice + this.totalTaxOrder)
    }
    return result;
  }
}
