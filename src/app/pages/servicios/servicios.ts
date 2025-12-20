import { Component } from '@angular/core';

import { Encabezado } from '../../components/encabezado/encabezado';
import { BarraNavegacion } from '../../components/barra-navegacion/barra-navegacion';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [Encabezado, BarraNavegacion],
  templateUrl: './servicios.html',
  styles: ``,
})
export class Servicios {
  currentYear = new Date().getFullYear();
}
