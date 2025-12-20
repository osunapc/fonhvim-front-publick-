import { Component } from '@angular/core';

import { Encabezado } from '../../components/encabezado/encabezado';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [Encabezado],
  templateUrl: './solicitudes.html',
  styles: ``,
})
export class Solicitudes {
  currentYear = new Date().getFullYear();
}
