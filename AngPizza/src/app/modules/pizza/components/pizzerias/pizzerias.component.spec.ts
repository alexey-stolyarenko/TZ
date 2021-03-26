import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzeriasComponent } from './pizzerias.component';

xdescribe('PizzeriasComponent', () => {
  let component: PizzeriasComponent;
  let fixture: ComponentFixture<PizzeriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzeriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
