import { Component } from '@angular/core';

import { Encabezado } from '../../components/encabezado/encabezado';
import { BarraNavegacion } from '../../components/barra-navegacion/barra-navegacion';

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [Encabezado, BarraNavegacion],
  templateUrl: './quienes-somos.html',
  styles: ``,
})
export class QuienesSomos {
  currentYear = new Date().getFullYear();
}
