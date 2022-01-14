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
  private suscriptor: Unsubscribable | undefined;
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
}
