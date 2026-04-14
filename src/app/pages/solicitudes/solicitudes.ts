import { Component, inject, ViewChild } from '@angular/core';
import { Encabezado } from '../../components/encabezado/encabezado';
import { SelectorTramites } from '../../components/solicitudes/selector-tramites/selector-tramites';
import { FormularioInstrumentoSocial } from '../../components/solicitudes/formulario-instrumento-social/formulario-instrumento-social';
import { CommonModule } from '@angular/common';
import { PublicSolicitudesService } from '../../common/services/solicitudes.service';

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
  @ViewChild(FormularioInstrumentoSocial) formularioSocial?: FormularioInstrumentoSocial;
  
  private solicitudesService = inject(PublicSolicitudesService);
  currentYear = new Date().getFullYear();
  view: 'list' | 'selector' | 'social-form' = 'list';
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  setViewState(newView: 'list' | 'selector' | 'social-form') {
    this.view = newView;
    this.menuOpen = false;
  }

  handleTramiteSelection(type: string) {
    if (type === 'social') {
      this.view = 'social-form';
    }
  }

  handleFormSubmit(data: any) {
    if (data instanceof SubmitEvent) {
      console.log('Recibido SubmitEvent directamente, ignorando');
      return;
    }
    console.log('Form data submitted:', data);
    this.solicitudesService.enviarSolicitud(data).subscribe({
      next: () => {
        alert(
          'Su solicitud ha sido enviada exitosamente. En breve recibirá noticias.',
        );
        this.formularioSocial?.resetForm();
        this.view = 'list';
      },
      error: (err) => {
        alert(
          'Error al enviar solicitud: ' +
            (err.error?.message || 'Servidor no disponible'),
        );
      },
    });
  }
}
