import { Component, EventEmitter, Output } from '@angular/core';
import { GaleriaImagenes } from '../galeria-imagenes/galeria-imagenes';
import { PanelAcceso } from '../panel-acceso/panel-acceso';

@Component({
  selector: 'app-seccion-principal',
  standalone: true,
  imports: [GaleriaImagenes, PanelAcceso],
  templateUrl: './seccion-principal.html',
  styles: [],
})
export class SeccionPrincipal {
  @Output() openLogin = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();
}
