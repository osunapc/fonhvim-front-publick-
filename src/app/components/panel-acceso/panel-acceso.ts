import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-panel-acceso',
  standalone: true,
  imports: [],
  templateUrl: './panel-acceso.html',
  styles: [],
})
export class PanelAcceso {
  @Output() openLogin = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();
  @Output() openForgotPassword = new EventEmitter<void>();
}
