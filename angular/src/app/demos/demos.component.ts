import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { NotificationService, NotificationType } from '../common-services';

@Component({
  selector: 'app-demos',
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.css']
})
// export class DemosComponent implements OnInit {
export class DemosComponent implements OnInit, OnDestroy {
  // propiedades privadas generadas correctamente (como deberiamos hacerlas)
  private suscriptor: Unsubscribable | undefined;
  private nombre: string = 'mundo';
  // propiedades públicas usando inferencia de tipos no son propiedades para ir más rápdio en el curso)
  listado = [
    { id: 1, nombre: "Madrid", },
    { id: 2, nombre: "barcelona", },
    { id: 3, nombre: "MURCIA", },
    { id: 4, nombre: "ciudad real", },
  ]
  idProvincia = 3;
  resultado: string | null = null;
  visible = true;
  estetica = { importante: true, error: false, urgente: true }
  fontSize = 24;
  constructor(public vm: NotificationService) { }
  ngOnDestroy(): void {
    if (this.suscriptor) {
      this.suscriptor.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.suscriptor = this.vm.Notificacion.subscribe(n => {
      // if (n.Type !== NotificationType.error) { return; }
      // window.alert(`Suscripcion: ${n.Message}`);
      // this.vm.remove(this.vm.Listado.length - 1);
    });
  }
  // metodos creados correctamente
  public get Nombre():string { return this.nombre; } //con get y set se ha creado la propiedad Nombre (!= atributo), de forma que si luego quiero hacer un set del atributo this.nombre puedo hacer "this.Nombre = 'Pepito'"
  public set Nombre(value: string) {
    if (this.nombre === value) { return; }
    this.nombre = value;
  }
  public saluda():void {
    this.resultado = `Hola ${this.Nombre}`
  }
  public despide():void {
    this.resultado = `Adiós ${this.Nombre}`
  }
  public di(algo:string):void {
    this.resultado = `Dice ${algo}`
  }
  public add(provincia:string) {
    const id = this.listado[this.listado.length-1].id + 1;
    this.listado.push({ id, nombre:provincia});
    this.idProvincia = id;
  }
  // metodos publicos creados no de forma estricta (no tan bueno)
  cambia(): void {
    this.visible = !this.visible;
    this.estetica.importante = !this.estetica.importante;
    this.estetica.error = !this.estetica.error;
  }
  calcula(a:number, b:number): number {
    return a+b;
  }
  // con estos metodos no importa la presentación del componente, clase agnóstica a la presentacion (css y html)
}
