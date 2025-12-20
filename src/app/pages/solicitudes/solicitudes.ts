import { Component } from '@angular/core';

import { Encabezado } from '../../components/encabezado/encabezado';
import { SelectorTramites } from '../../components/solicitudes/selector-tramites/selector-tramites';
import { FormularioInstrumentoSocial } from '../../components/solicitudes/formulario-instrumento-social/formulario-instrumento-social';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [
    CommonModule,
    Encabezado,
    SelectorTramites,
    FormularioInstrumentoSocial,
  ],
  templateUrl: './solicitudes.html',
  styles: ``,
})
export class Solicitudes {
  currentYear = new Date().getFullYear();
  view: 'list' | 'selector' | 'social-form' = 'list';

  setViewState(newView: 'list' | 'selector' | 'social-form') {
    this.view = newView;
  }

  handleTramiteSelection(type: string) {
    if (type === 'social') {
      this.view = 'social-form';
    }
  }

  handleFormSubmit(data: any) {
    console.log('Form data submitted:', data);
    // Aquí se llamaría al servicio de backend creado previamente
    this.view = 'list';
  }
}
