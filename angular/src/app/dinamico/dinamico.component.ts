import { Component, OnInit } from '@angular/core';
import { CalculatorComponent } from '../calculator/calculator.component';
import { ContactosComponent } from '../contactos/componente.component';
import { DemosComponent } from '../demos/demos.component';
import { FormularioComponent } from '../formulario/formulario.component';
import { HomeComponent } from '../main';

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.css']
})
export class DinamicoComponent implements OnInit {
  menu = [

    { texto: 'Contactos', icono: '', componente: ContactosComponent},
    { texto: 'Formulario', icono: '', componente: FormularioComponent},
    { texto: 'Calculator', icono: '', componente: CalculatorComponent},
    { texto: 'Demos', icono: '', componente: DemosComponent },
    { texto: 'Inicio', icono: '', componente: HomeComponent},
  ]
  actual: any = this.menu[0].componente;
  constructor() { }
  public seleccionar(indice: number): void {
    this.actual = this.menu[indice].componente;
  }
  ngOnInit(): void {
  }

}
