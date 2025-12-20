import { Component } from '@angular/core';

import { Encabezado } from '../../components/encabezado/encabezado';
import { BarraNavegacion } from '../../components/barra-navegacion/barra-navegacion';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [Encabezado, BarraNavegacion],
  templateUrl: './galeria.html',
  styles: ``,
})
export class Galeria {
  currentYear = new Date().getFullYear();
}
