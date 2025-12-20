import { Component } from '@angular/core';

import { Encabezado } from '../../components/encabezado/encabezado';
import { BarraNavegacion } from '../../components/barra-navegacion/barra-navegacion';

@Component({
  selector: 'app-organigrama',
  standalone: true,
  imports: [Encabezado, BarraNavegacion],
  templateUrl: './organigrama.html',
  styles: ``,
})
export class Organigrama {
  currentYear = new Date().getFullYear();
}
