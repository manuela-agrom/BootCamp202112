import { Component, OnInit } from '@angular/core';
import { CalculatorComponent } from '../calculator/calculator.component';
import { DemosComponent } from '../demos/demos.component';
import { HomeComponent } from '../main';

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.css']
})
export class DinamicoComponent implements OnInit {
  menu = [
    { texto: 'Demos', icono: '', componente: DemosComponent },
    { texto: 'Inicio', icono: '', componente: HomeComponent},
    { texto: 'Calculator', icono: '', componente: CalculatorComponent},
  ]
  actual: any = this.menu[0].componente;
  constructor() { }
  public seleccionar(indice: number): void {
    this.actual = this.menu[indice].componente;
  }
  ngOnInit(): void {
  }

}
