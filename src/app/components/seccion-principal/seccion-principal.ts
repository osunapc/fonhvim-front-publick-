import { Component, EventEmitter, Output } from '@angular/core';
import { GaleriaImagenes } from '../galeria-imagenes/galeria-imagenes';
import { PanelAcceso } from '../panel-acceso/panel-acceso';

@Component({
  selector: 'app-seccion-principal',
  standalone: true,
  imports: [GaleriaImagenes, PanelAcceso],
  template: `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      <!-- Columna Izquierda (70%) - Galería -->
      <div
        class="lg:col-span-8 bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-full min-h-[500px]"
      >
        <app-galeria-imagenes></app-galeria-imagenes>
      </div>

      <!-- Columna Derecha (30%) - Panel Acceso -->
      <div class="lg:col-span-4 h-full">
        <app-panel-acceso
          (openLogin)="openLogin.emit()"
          (openRegister)="openRegister.emit()"
        >
        </app-panel-acceso>
      </div>
    </div>
  `,
  styles: [],
})
export class SeccionPrincipal {
  @Output() openLogin = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();
}
